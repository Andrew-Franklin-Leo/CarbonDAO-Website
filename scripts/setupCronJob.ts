import { CronJob } from 'cron';
import * as dotenv from 'dotenv';
import BlogGenerator from './generateBlogPost';
import { promises as fs } from 'fs';
import path from 'path';

dotenv.config();

interface JobStatus {
  lastRun: string;
  success: boolean;
  error?: string;
  generatedPosts: string[];
}

class BlogGenerationScheduler {
  private cronJob: CronJob;
  private generator: BlogGenerator;
  private statusFile: string;

  constructor() {
    this.generator = new BlogGenerator();
    this.statusFile = path.join(__dirname, '..', 'cache', 'job-status.json');
    
    // Default to daily at midnight if not specified
    const cronSchedule = process.env.BLOG_GENERATION_INTERVAL || '0 0 * * *';
    
    this.cronJob = new CronJob(cronSchedule, this.runJob.bind(this), null, false);
  }

  async initialize(): Promise<void> {
    await this.generator.initialize();
    await this.ensureStatusFile();
  }

  private async ensureStatusFile(): Promise<void> {
    try {
      await fs.access(this.statusFile);
    } catch {
      const initialStatus: JobStatus = {
        lastRun: new Date().toISOString(),
        success: true,
        generatedPosts: [],
      };
      await fs.mkdir(path.dirname(this.statusFile), { recursive: true });
      await fs.writeFile(this.statusFile, JSON.stringify(initialStatus, null, 2));
    }
  }

  private async updateStatus(status: Partial<JobStatus>): Promise<void> {
    const currentStatus = await this.getStatus();
    const newStatus = { ...currentStatus, ...status };
    await fs.writeFile(this.statusFile, JSON.stringify(newStatus, null, 2));
  }

  private async getStatus(): Promise<JobStatus> {
    try {
      const content = await fs.readFile(this.statusFile, 'utf8');
      return JSON.parse(content);
    } catch {
      return {
        lastRun: new Date().toISOString(),
        success: true,
        generatedPosts: [],
      };
    }
  }

  private async generateTopics(): Promise<string[]> {
    // You could extend this to pull from trending topics, RSS feeds, or other sources
    return [
      `Carbon Market Updates for ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      'Innovations in Carbon Credit Verification',
      'Blockchain Technology in Environmental Markets',
      'Sustainability Trends and Carbon Trading',
    ];
  }

  private async runJob(): Promise<void> {
    console.log('Starting blog generation job...');
    const generatedPosts: string[] = [];
    let success = true;
    let error: string | undefined;

    try {
      const topics = await this.generateTopics();
      
      for (const topic of topics) {
        try {
          const cachedContent = await this.generator.getCachedResult(topic);
          
          if (cachedContent) {
            console.log(`Using cached content for ${topic}`);
            const filepath = await this.generator.saveBlogPost(cachedContent, topic);
            generatedPosts.push(filepath);
            continue;
          }

          console.log(`Generating new post for: ${topic}`);
          const content = await this.generator.generateBlogPost(topic);
          const filepath = await this.generator.saveBlogPost(content, topic);
          await this.generator.cacheResult(topic, content);
          generatedPosts.push(filepath);

          // Respect rate limits
          await new Promise(resolve => 
            setTimeout(resolve, parseInt(process.env.RATE_LIMIT_DELAY || '5000'))
          );
        } catch (err) {
          console.error(`Failed to generate post for ${topic}:`, err);
          // Continue with other topics even if one fails
        }
      }
    } catch (err) {
      success = false;
      error = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Blog generation job failed:', error);
    }

    await this.updateStatus({
      lastRun: new Date().toISOString(),
      success,
      error,
      generatedPosts,
    });

    console.log('Blog generation job completed.');
  }

  start(): void {
    this.cronJob.start();
    console.log('Blog generation scheduler started.');
    console.log('Next run scheduled for:', this.cronJob.nextDates().toISOString());
  }

  stop(): void {
    this.cronJob.stop();
    console.log('Blog generation scheduler stopped.');
  }

  async runManually(): Promise<void> {
    console.log('Running blog generation job manually...');
    await this.runJob();
  }
}

// Start the scheduler when run directly
if (require.main === module) {
  const scheduler = new BlogGenerationScheduler();
  scheduler.initialize()
    .then(() => scheduler.start())
    .catch(console.error);
}

export default BlogGenerationScheduler;