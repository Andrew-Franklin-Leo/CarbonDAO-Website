---
sidebar_position: 3
---

# API Specifications

## Overview

CarbonDAO provides a comprehensive RESTful API for interacting with the platform. This documentation covers API endpoints, authentication, rate limiting, and integration guidelines.

## Authentication

### API Keys

```bash
# Header format
Authorization: Bearer <your_api_key>
```

### JWT Tokens

```bash
# Header format
Authorization: Bearer <jwt_token>

# JWT Payload structure
{
  "sub": "user_id",
  "exp": 1735689600,
  "iat": 1704153600,
  "permissions": ["trade", "view"]
}
```

## Rate Limiting

- Standard tier: 100 requests/minute
- Premium tier: 1000 requests/minute
- Enterprise tier: Custom limits

```http
# Rate limit headers
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704153600
```

## Endpoints

### Project Registry

#### List Projects

```http
GET /api/v1/projects

Query Parameters:
- status (optional): pending|approved|rejected
- page (optional): number
- limit (optional): number
- sort (optional): created_at|updated_at

Response:
{
  "data": [
    {
      "id": "project_123",
      "name": "Amazon Reforestation",
      "status": "approved",
      "totalCredits": 100000,
      "availableCredits": 75000,
      "vintage": 2024,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

#### Register Project

```http
POST /api/v1/projects

Request Body:
{
  "name": "Amazon Reforestation",
  "description": "Reforestation project in Amazon",
  "location": {
    "latitude": -3.4653,
    "longitude": -62.2159
  },
  "methodology": "VCS VM0007",
  "estimatedCredits": 100000,
  "documents": [
    {
      "type": "verification_report",
      "url": "https://..."
    }
  ]
}

Response:
{
  "id": "project_123",
  "status": "pending",
  "created_at": "2024-01-01T00:00:00Z"
}
```

### Carbon Credits

#### List Credits

```http
GET /api/v1/credits

Query Parameters:
- project_id (optional): string
- vintage (optional): number
- status (optional): active|retired
- page (optional): number
- limit (optional): number

Response:
{
  "data": [
    {
      "id": "credit_123",
      "projectId": "project_123",
      "vintage": 2024,
      "amount": 1000,
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 1000,
    "page": 1,
    "limit": 10
  }
}
```

#### Retire Credits

```http
POST /api/v1/credits/retire

Request Body:
{
  "creditId": "credit_123",
  "amount": 100,
  "retirementReason": "Corporate offsetting",
  "beneficiary": "Company XYZ"
}

Response:
{
  "id": "retirement_123",
  "creditId": "credit_123",
  "amount": 100,
  "status": "completed",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Trading

#### Place Order

```http
POST /api/v1/orders

Request Body:
{
  "creditId": "credit_123",
  "type": "buy",
  "amount": 1000,
  "price": "25.50",
  "expiryTime": "2024-02-01T00:00:00Z"
}

Response:
{
  "id": "order_123",
  "status": "active",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### List Orders

```http
GET /api/v1/orders

Query Parameters:
- type: buy|sell
- status: active|filled|cancelled
- creditId (optional): string
- page (optional): number
- limit (optional): number

Response:
{
  "data": [
    {
      "id": "order_123",
      "creditId": "credit_123",
      "type": "buy",
      "amount": 1000,
      "price": "25.50",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

### Market Data

#### Price History

```http
GET /api/v1/market/prices

Query Parameters:
- creditId (optional): string
- from: ISO date
- to: ISO date
- interval: hour|day|week|month

Response:
{
  "data": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "open": "25.00",
      "high": "26.50",
      "low": "24.75",
      "close": "25.50",
      "volume": 10000
    }
  ]
}
```

## WebSocket API

### Connection

```javascript
const ws = new WebSocket('wss://api.carbondao.example/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channels: ['orders', 'trades'],
    creditIds: ['credit_123']
  }));
};
```

### Message Types

#### Order Updates

```javascript
{
  "type": "order",
  "data": {
    "id": "order_123",
    "creditId": "credit_123",
    "type": "buy",
    "amount": 1000,
    "price": "25.50",
    "status": "active",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### Trade Updates

```javascript
{
  "type": "trade",
  "data": {
    "id": "trade_123",
    "orderId": "order_123",
    "creditId": "credit_123",
    "amount": 1000,
    "price": "25.50",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## Error Handling

### Error Response Format

```javascript
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request parameters",
    "details": {
      "field": "amount",
      "issue": "must be greater than 0"
    }
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Invalid or missing API key
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INSUFFICIENT_FUNDS`: Insufficient balance for order
- `INVALID_REQUEST`: Invalid request parameters
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Internal server error

## SDK Examples

### JavaScript/TypeScript

```typescript
import { CarbonDAO } from '@carbondao/sdk';

const client = new CarbonDAO({
  apiKey: 'your_api_key',
  environment: 'production'
});

// List projects
const projects = await client.projects.list({
  status: 'approved',
  page: 1,
  limit: 10
});

// Place order
const order = await client.orders.create({
  creditId: 'credit_123',
  type: 'buy',
  amount: 1000,
  price: '25.50'
});
```

## API Versioning

- Current version: v1
- Version format: v{major}
- Version specified in URL path
- Breaking changes trigger version increment