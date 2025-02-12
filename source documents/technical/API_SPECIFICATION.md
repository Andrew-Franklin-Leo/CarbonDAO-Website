# API Specification

## REST API Endpoints

### Authentication
```
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### User Management
```
POST   /api/v1/users
GET    /api/v1/users/{id}
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
GET    /api/v1/users/{id}/portfolio
```

### Projects
```
POST   /api/v1/projects
GET    /api/v1/projects
GET    /api/v1/projects/{id}
PUT    /api/v1/projects/{id}
DELETE /api/v1/projects/{id}
GET    /api/v1/projects/{id}/credits
POST   /api/v1/projects/{id}/verify
```

### Carbon Credits
```
GET    /api/v1/credits
GET    /api/v1/credits/{id}
POST   /api/v1/credits/{id}/transfer
GET    /api/v1/credits/{id}/history
POST   /api/v1/credits/batch-transfer
```

### Marketplace
```
GET    /api/v1/market/orders
POST   /api/v1/market/orders
GET    /api/v1/market/orders/{id}
DELETE /api/v1/market/orders/{id}
GET    /api/v1/market/price-history
```

### Governance
```
GET    /api/v1/governance/proposals
POST   /api/v1/governance/proposals
GET    /api/v1/governance/proposals/{id}
POST   /api/v1/governance/vote
GET    /api/v1/governance/delegates
```

## WebSocket API

### Market Data
```
ws://api/v1/market/stream
- order_updates
- price_updates
- trade_execution
```

### User Events
```
ws://api/v1/users/stream
- portfolio_updates
- order_status
- transaction_status
```

## Data Models

### Project
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    country: string;
  };
  type: ProjectType;
  status: ProjectStatus;
  verificationStatus: VerificationStatus;
  totalCredits: number;
  availableCredits: number;
  startDate: Date;
  endDate: Date;
  metadata: Record<string, any>;
}
```

### CarbonCredit
```typescript
interface CarbonCredit {
  id: string;
  projectId: string;
  tokenId: string;
  amount: number;
  vintage: number;
  status: CreditStatus;
  verificationData: {
    verifier: string;
    date: Date;
    evidence: string;
  };
  metadata: Record<string, any>;
}
```

### Order
```typescript
interface Order {
  id: string;
  type: OrderType;
  status: OrderStatus;
  price: number;
  amount: number;
  filled: number;
  creditId: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}
```

## Error Handling

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

### Error Response Format
```typescript
interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
  requestId: string;
}
```

## Rate Limiting
- Authentication endpoints: 5 requests per minute
- User endpoints: 60 requests per minute
- Market data: 120 requests per minute
- Websocket connections: 5 per user
