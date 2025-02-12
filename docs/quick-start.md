---
sidebar_position: 2
---

# Quick Start Guide

This guide will help you get started with CarbonDAO quickly.

## Prerequisites

- Web3 wallet (MetaMask recommended)
- Basic understanding of blockchain technology
- (Optional) Technical knowledge for development

## Connect Your Wallet

1. Install MetaMask or another Web3 wallet
2. Connect to the Ethereum network
3. Add CarbonDAO network settings if needed
4. Connect your wallet to our platform

## Understanding Roles

CarbonDAO has several key roles:

- **Traders**: Buy and sell carbon credits
- **Project Developers**: Register carbon credit projects
- **Verifiers**: Validate project claims
- **Governance Participants**: Vote on proposals

## Getting Started as a Trader

1. Connect your wallet
2. Browse available carbon credits
3. Place buy/sell orders
4. Manage your portfolio

## Project Registration

To register a carbon credit project:

1. Prepare project documentation
2. Submit for verification
3. Complete validation process
4. Receive approved credits

## Participating in Governance

To participate in governance:

1. Hold governance tokens
2. Stake tokens for voting power
3. Review active proposals
4. Cast your votes

## Development Integration

For developers:

```typescript
// Example: Connect to CarbonDAO contracts
import { ethers } from 'ethers';
import { CarbonCreditToken, Marketplace } from '@carbondao/contracts';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Initialize contracts
const marketplace = new ethers.Contract(
  MARKETPLACE_ADDRESS,
  Marketplace.abi,
  signer
);

// Example: Place a buy order
async function placeBuyOrder(tokenId: string, amount: number, price: number) {
  try {
    const tx = await marketplace.placeBuyOrder(tokenId, amount, price);
    await tx.wait();
    console.log('Buy order placed successfully');
  } catch (error) {
    console.error('Error placing buy order:', error);
  }
}
```

## Next Steps

- Explore our [Technical Documentation](technical/architecture)
- Learn about our [Governance Framework](governance/framework)
- Join our [Discord Community](https://discord.gg/your-discord)
- Follow our [Twitter](https://twitter.com/your-twitter)

## Need Help?

Visit our [Support Page](support) or reach out to our community on Discord.