# Database Schema Specification

## Overview
The system uses PostgreSQL as the primary database and Redis for caching.

## Tables

### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    role VARCHAR(20) DEFAULT 'user'
);

CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_email ON users(email);
```

### Projects
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    project_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    credits_available DECIMAL(20,6) DEFAULT 0,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    country VARCHAR(100),
    verifier_address VARCHAR(42),
    verification_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_type ON projects(project_type);
```

### Carbon Credits
```sql
CREATE TABLE carbon_credits (
    token_id UUID PRIMARY KEY,
    project_id UUID REFERENCES projects(id),
    amount DECIMAL(20,6) NOT NULL,
    vintage_year INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project
        FOREIGN KEY(project_id) 
        REFERENCES projects(id)
);

CREATE INDEX idx_credits_owner ON carbon_credits(owner_address);
CREATE INDEX idx_credits_status ON carbon_credits(status);
```

### Marketplace Listings
```sql
CREATE TABLE marketplace_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token_id UUID REFERENCES carbon_credits(token_id),
    seller_address VARCHAR(42) NOT NULL,
    price_per_credit DECIMAL(20,6) NOT NULL,
    amount DECIMAL(20,6) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_listings_status ON marketplace_listings(status);
CREATE INDEX idx_listings_seller ON marketplace_listings(seller_address);
```

### Governance Proposals
```sql
CREATE TABLE governance_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proposer_address VARCHAR(42) NOT NULL,
    status VARCHAR(20) NOT NULL,
    voting_starts TIMESTAMP WITH TIME ZONE NOT NULL,
    voting_ends TIMESTAMP WITH TIME ZONE NOT NULL,
    votes_for DECIMAL(20,6) DEFAULT 0,
    votes_against DECIMAL(20,6) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_proposals_status ON governance_proposals(status);
```

### Votes
```sql
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID REFERENCES governance_proposals(id),
    voter_address VARCHAR(42) NOT NULL,
    vote_amount DECIMAL(20,6) NOT NULL,
    vote_type BOOLEAN NOT NULL, -- true for yes, false for no
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_proposal
        FOREIGN KEY(proposal_id) 
        REFERENCES governance_proposals(id)
);

CREATE INDEX idx_votes_voter ON votes(voter_address);
CREATE INDEX idx_votes_proposal ON votes(proposal_id);
```

### Transactions
```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tx_hash VARCHAR(66) UNIQUE NOT NULL,
    from_address VARCHAR(42) NOT NULL,
    to_address VARCHAR(42) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    amount DECIMAL(20,6),
    gas_used DECIMAL(20,6),
    block_number BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_hash ON transactions(tx_hash);
CREATE INDEX idx_transactions_from ON transactions(from_address);
CREATE INDEX idx_transactions_to ON transactions(to_address);
```

## Redis Cache Structure

### User Session Cache
```
Key: user:{userId}:session
TTL: 24 hours
Value: {
    "userId": UUID,
    "email": string,
    "walletAddress": string,
    "role": string
}
```

### Project Cache
```
Key: project:{projectId}
TTL: 1 hour
Value: {
    "id": UUID,
    "name": string,
    "description": string,
    ...
}
```

### Market Data Cache
```
Key: market:stats
TTL: 5 minutes
Value: {
    "totalVolume": number,
    "activeListings": number,
    "averagePrice": number
}
```

## Backup Strategy

### Regular Backups
- Full database backup daily
- WAL archiving enabled
- Retention period: 30 days

### Disaster Recovery
- Point-in-time recovery capability
- Multiple backup locations
- Recovery time objective (RTO): 1 hour

## Database Maintenance

### Indexing Strategy
- Regular index maintenance
- Monitoring index usage
- Periodic reindexing

### Performance Optimization
- Table partitioning for large tables
- Regular vacuum
- Query optimization