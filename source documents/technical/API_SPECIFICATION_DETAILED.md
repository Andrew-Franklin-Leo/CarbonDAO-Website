# API Specification

## Base URL
`https://api.carbondao.com/v1`

## Authentication
```json
{
    "type": "Bearer Token",
    "header": "Authorization: Bearer <token>"
}
```

## Endpoints

### User Management

#### Register User
```http
POST /users/register
Content-Type: application/json

{
    "email": "string",
    "password": "string",
    "walletAddress": "string"
}

Response 201:
{
    "userId": "string",
    "token": "string"
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
    "email": "string",
    "password": "string"
}

Response 200:
{
    "token": "string"
}
```

### Carbon Projects

#### List Projects
```http
GET /projects
Query Parameters:
- page: number
- limit: number
- status: string (pending|active|completed)
- type: string (reforestation|solar|wind)

Response 200:
{
    "projects": [
        {
            "id": "string",
            "name": "string",
            "description": "string",
            "type": "string",
            "status": "string",
            "creditsAvailable": "number",
            "location": {
                "latitude": "number",
                "longitude": "number",
                "country": "string"
            }
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

#### Get Project Details
```http
GET /projects/{projectId}

Response 200:
{
    "id": "string",
    "name": "string",
    "description": "string",
    "type": "string",
    "status": "string",
    "creditsAvailable": "number",
    "location": {
        "latitude": "number",
        "longitude": "number",
        "country": "string"
    },
    "verification": {
        "verifier": "string",
        "date": "string",
        "documents": ["string"]
    },
    "metrics": {
        "co2Sequestered": "number",
        "treesPlanted": "number"
    }
}
```

### Carbon Credits

#### List Carbon Credits
```http
GET /credits
Query Parameters:
- page: number
- limit: number
- status: string (available|retired)
- projectId: string

Response 200:
{
    "credits": [
        {
            "tokenId": "string",
            "projectId": "string",
            "amount": "number",
            "status": "string",
            "vintage": "string"
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

#### Retire Carbon Credits
```http
POST /credits/{tokenId}/retire
Content-Type: application/json

{
    "amount": "number",
    "retirementReason": "string"
}

Response 200:
{
    "transactionHash": "string",
    "retirementCertificate": "string"
}
```

### Marketplace

#### List Listings
```http
GET /marketplace/listings
Query Parameters:
- page: number
- limit: number
- status: string (active|sold|cancelled)
- minPrice: number
- maxPrice: number

Response 200:
{
    "listings": [
        {
            "id": "string",
            "tokenId": "string",
            "seller": "string",
            "price": "number",
            "amount": "number",
            "status": "string"
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

#### Create Listing
```http
POST /marketplace/listings
Content-Type: application/json

{
    "tokenId": "string",
    "price": "number",
    "amount": "number"
}

Response 201:
{
    "listingId": "string",
    "transactionHash": "string"
}
```

### Governance

#### List Proposals
```http
GET /governance/proposals
Query Parameters:
- page: number
- limit: number
- status: string (active|passed|rejected|pending)

Response 200:
{
    "proposals": [
        {
            "id": "string",
            "title": "string",
            "description": "string",
            "proposer": "string",
            "status": "string",
            "votingEnds": "string",
            "votes": {
                "for": "number",
                "against": "number"
            }
        }
    ],
    "pagination": {
        "total": "number",
        "page": "number",
        "limit": "number"
    }
}
```

#### Submit Vote
```http
POST /governance/proposals/{proposalId}/vote
Content-Type: application/json

{
    "vote": "boolean",
    "votingPower": "number"
}

Response 200:
{
    "transactionHash": "string"
}
```

## Error Responses
```json
{
    "error": {
        "code": "string",
        "message": "string",
        "details": {}
    }
}
```

## Rate Limiting
- 100 requests per minute per IP
- 1000 requests per minute per authenticated user

## Versioning
- API version included in URL
- Breaking changes require new version