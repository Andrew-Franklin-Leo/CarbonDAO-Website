import * as dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import axios from 'axios';

dotenv.config();

interface AIService {
  name: string;
  endpoint: string;
  apiKey: string;
  isAvailable: boolean;
}

const AI_SERVICES: AIService[] = [
  {
    name: 'Deepseek',
    endpoint: process.env.DEEPSEEK_ENDPOINT || '',
    apiKey: process.env.DEEPSEEK_API_KEY || '',
    isAvailable: false,
  },
  {
    name: 'Llama',
    endpoint: process.env.LLAMA_ENDPOINT || '',
    apiKey: process.env.LLAMA_API_KEY || '',
    isAvailable: false,
  },
  {
    name: 'Gemini',
    endpoint: process.env.GEMINI_ENDPOINT || '',
    apiKey: process.env.GEMINI_API_KEY || '',
    isAvailable: false,
  },
  {
    name: 'OpenRouter',
    endpoint: process.env.OPENROUTER_ENDPOINT || '',
    apiKey: process.env.OPENROUTER_API_KEY || '',
    isAvailable: false,
  },
  {
    name: 'Azure',
    endpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    apiKey: process.env.AZURE_OPENAI_API_KEY || '',
    isAvailable: false,
  },
];

class BlogGenerator {
  private availableServices: AIService[] = [];
  private readonly blogDir: string;
  private readonly cacheDir: string;

  constructor() {
    this.blogDir = path.join(__dirname, '..', 'blog');
    this.cacheDir = path.join(__dirname, '..', 'cache');
  }

  async initialize(): Promise<void> {
    // Create directories if they don't exist
    await fs.mkdir(this.blogDir, { recursive: true });
    await fs.mkdir(this.cacheDir, { recursive: true });

    // Check service availability
    await this.checkServices();
    
    if (this.availableServices.length === 0) {
      throw new Error('No AI services are available');
    }
  }

  private async checkServices(): Promise<void> {
    for (const service of AI_SERVICES) {
      try {
        const isAvailable = await this.checkServiceHealth(service);
        if (isAvailable) {
          service.isAvailable = true;
          this.availableServices.push(service);
        }
      } catch (error) {
        console.warn(`Service ${service.name} is not available:`, error);
      }
    }
  }

  private async checkServiceHealth(service: AIService): Promise<boolean> {
    try {
      const response = await axios.get(service.endpoint + '/health', {
        headers: { Authorization: `Bearer ${service.apiKey}` },
        timeout: 5000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  async generateBlogPost(topic: string): Promise<string> {
    // Try each available service until successful
    for (const service of this.availableServices) {
      try {
        const content = await this.generateWithService(service, topic);
        if (content) {
          return content;
        }
      } catch (error) {
        console.error(`Failed to generate with ${service.name}:`, error);
        continue;
      }
    }
    throw new Error('Failed to generate blog post with any available service');
  }

  private async generateWithService(service: AIService, topic: string): Promise<string> {
    const prompt = `Write a detailed blog post about ${topic} in markdown format. 
    Include technical details, examples, and relevant links. 
    Focus on blockchain and carbon credit trading aspects.`;

    try {
      const response = await axios.post(
        service.endpoint,
        { prompt, max_tokens: 2000 },
        { headers: { Authorization: `Bearer ${service.apiKey}` } }
      );

      return response.data.choices[0].text;
    } catch (error) {
      console.error(`Error with ${service.name}:`, error);
      throw error;
    }
  }

  async saveBlogPost(content: string, topic: string): Promise<string> {
    const date = new Date().toISOString().split('T')[0];
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `${date}-${slug}.md`;
    const filepath = path.join(this.blogDir, filename);

    const fullContent = `---
slug: ${slug}
title: ${topic}
authors: [carbondao]
tags: [carbon-credits, blockchain, sustainability]
---

${content}`;

    await fs.writeFile(filepath, fullContent, 'utf8');
    return filepath;
  }

  async cacheResult(key: string, content: string): Promise<void> {
    const cacheFile = path.join(this.cacheDir, `${key}.json`);
    await fs.writeFile(cacheFile, JSON.stringify({
      content,
      timestamp: new Date().toISOString(),
    }));
  }

  async getCachedResult(key: string): Promise<string | null> {
    try {
      const cacheFile = path.join(this.cacheDir, `${key}.json`);
      const data = JSON.parse(await fs.readFile(cacheFile, 'utf8'));
      
      // Cache expires after 24 hours
      const cacheAge = Date.now() - new Date(data.timestamp).getTime();
      if (cacheAge > 24 * 60 * 60 * 1000) {
        return null;
      }
      
      return data.content;
    } catch {
      return null;
    }
  }
}

async function main() {
  const generator = new BlogGenerator();
  await generator.initialize();

  const topics = [
    'Carbon Credit Market Trends 2025',
    'Blockchain Technology in Environmental Markets',
    'The Future of Decentralized Carbon Trading',
  ];

  for (const topic of topics) {
    try {
      // Check cache first
      const cachedContent = await generator.getCachedResult(topic);
      if (cachedContent) {
        console.log(`Using cached content for ${topic}`);
        await generator.saveBlogPost(cachedContent, topic);
        continue;
      }

      // Generate new content
      console.log(`Generating blog post for: ${topic}`);
      const content = await generator.generateBlogPost(topic);
      await generator.saveBlogPost(content, topic);
      await generator.cacheResult(topic, content);
      
      // Wait between generations to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(`Failed to generate blog post for ${topic}:`, error);
    }
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export default BlogGenerator;