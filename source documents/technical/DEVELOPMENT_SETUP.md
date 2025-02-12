# Development Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- Hardhat
- PostgreSQL
- Redis (for caching)
- MetaMask

## Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Install dependencies:
```bash
npm install
```

## Smart Contract Development
- Uses Hardhat for development and testing
- Supports TypeScript
- Includes OpenZeppelin contracts

### Local Development
```bash
# Start local blockchain
npx hardhat node

# Deploy contracts
npx hardhat deploy --network localhost

# Run tests
npx hardhat test
```

## Frontend Development
- React.js with TypeScript
- Web3.js for blockchain interactions
- Material-UI components

### Local Development
```bash
# Start development server
npm run dev

# Run tests
npm run test
```

## Backend Development
- Node.js API server
- PostgreSQL database
- Redis caching

### Database Setup
```bash
# Create database
createdb carbon_dao

# Run migrations
npm run migrate
```

## Testing
- Unit tests: Jest
- Integration tests: Supertest
- Smart contract tests: Hardhat
- Frontend tests: React Testing Library

## Deployment
- CI/CD using GitHub Actions
- Docker containers for services
- AWS infrastructure

## Documentation
- API documentation: Swagger
- Smart contract documentation: NatSpec
- Frontend documentation: Storybook