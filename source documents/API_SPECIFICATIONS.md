# API Specifications

## Core Endpoints

### Carbon Credit API
`POST /api/v1/credits/mint`
- Parameters: project_id, verification_hash
- Response: {tx_hash, token_id}

`GET /api/v1/credits/{token_id}`
- Response: {project_details, ownership_history}

### Governance API
`POST /api/v1/proposals`
- Parameters: title, description, voting_options
- Response: {proposal_id, voting_period}

## Security Requirements
- OAuth2 authentication
- Rate limiting: 100 requests/minute
- IP whitelisting for admin endpoints