---
sidebar_position: 3
---

# API Specifications

## Overview

CarbonDAO provides a comprehensive RESTful API for interacting with the platform. Our API follows standard REST conventions and uses JSON for request and response payloads.

## Base URL

```
Production: https://api.carbondao.example
Staging: https://api-staging.carbondao.example
```

## Authentication

All API requests require authentication using a Bearer token:

```http
Authorization: Bearer <your-api-token>
```

## Rate Limiting

| Tier       | Rate Limit        |
|------------|------------------|
| Standard   | 100 req/minute   |
| Premium    | 1000 req/minute  |
| Enterprise | Custom           |

Rate limit headers are included in all responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704153600
```

## Endpoints

### Projects

#### List Projects

```http
GET /v1/projects

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

#### Create Project

```http
POST /v1/projects

Request Body:
{
  "name": "Amazon Reforestation",
  "description": "Reforestation project in Amazon",
  "location": {
    "latitude": -3.4653,
    "longitude": -62.2159
  },
  "methodology": "VCS VM0007",
  "estimatedCredits": 100000
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
GET /v1/credits

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
POST /v1/credits/retire

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

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {
      "field": "specific_field",
      "issue": "specific issue"
    }
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| UNAUTHORIZED | Invalid or missing API key |
| RATE_LIMIT_EXCEEDED | Too many requests |
| INSUFFICIENT_FUNDS | Insufficient balance |
| INVALID_REQUEST | Invalid parameters |
| NOT_FOUND | Resource not found |
| INTERNAL_ERROR | Server error |

## Versioning

API versions are included in the URL path:
- Current version: `v1`
- Example: `https://api.carbondao.example/v1/projects`

Breaking changes will result in a new API version.