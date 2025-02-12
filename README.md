# CarbonDAO Documentation & CMS

A Docusaurus-powered documentation site and CMS for CarbonDAO, featuring automated blog post generation using multiple AI services.

## Features

- TypeScript-based Docusaurus setup
- Automated blog post generation using multiple AI services:
  - Deepseek R1
  - Llama 3.3
  - Gemini Flash 2.0
  - OpenRouter APIs
  - Azure OpenAI (fallback)
- Scheduled content generation
- Content caching system
- Rate limiting and quota management
- Service health monitoring
- Fallback mechanisms

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your API keys and preferences.

3. Start the development server:
```bash
npm start
```

## Documentation Structure

- `/docs/` - Main documentation content
- `/blog/` - Auto-generated and manual blog posts
- `/src/` - Source code for custom components
- `/scripts/` - Automation scripts for blog generation

## Blog Generation

### Manual Generation

```bash
npm run generate-blog
```

### Scheduled Generation

```bash
npm run schedule-blog
```

The scheduler will run according to the cron schedule defined in your `.env` file.

### Content Caching

Generated content is cached for 24 hours by default. You can modify the cache duration in `.env`:

```env
BLOG_CACHE_DURATION=86400  # 24 hours in seconds
```

## Development

### TypeScript

The project uses TypeScript for type safety. Check types with:

```bash
npm run typecheck
```

### Custom Components

Custom React components are located in `/src/components/`.

### Styling

CSS modules are used for component-specific styles.

## Configuration Files

- `docusaurus.config.js` - Main Docusaurus configuration
- `sidebars.js` - Documentation navigation structure
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables and API keys

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## Scripts

- `npm start` - Start development server
- `npm run build` - Build production site
- `npm run serve` - Serve production build
- `npm run generate-blog` - Generate blog posts manually
- `npm run schedule-blog` - Start the blog generation scheduler

## Monitoring

Monitor the blog generation process through:

- Logs in `cache/job-status.json`
- Console output during generation
- Service health checks

## Troubleshooting

### Common Issues

1. API Rate Limits
   - Adjust `RATE_LIMIT_DELAY` in `.env`
   - Check service quotas

2. Failed Generations
   - Check service health status
   - Verify API keys
   - Review error logs

3. TypeScript Errors
   - Run `npm run typecheck`
   - Check import paths
   - Verify type definitions

### Support

For support:
1. Check the documentation
2. Review GitHub issues
3. Contact the development team

## License

MIT License - see LICENSE file for details