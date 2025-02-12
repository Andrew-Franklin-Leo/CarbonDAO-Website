# Database Schema

## PostgreSQL Tables

### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'active',
    kyc_status VARCHAR(20) DEFAULT 'pending',
    metadata JSONB
);
```

### Projects
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    country VARCHAR(100),
    project_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    verification_status VARCHAR(50) NOT NULL,
    total_credits DECIMAL(20,6) NOT NULL,
    available_credits DECIMAL(20,6) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    creator_id UUID REFERENCES users(id),
    metadata JSONB
);
```

### Carbon Credits
```sql
CREATE TABLE carbon_credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id),
    token_id VARCHAR(66) UNIQUE NOT NULL,
    amount DECIMAL(20,6) NOT NULL,
    vintage_year INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    owner_address VARCHAR(42) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    verification_data JSONB,
    metadata JSONB
);
```

### Orders
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    credit_id UUID REFERENCES carbon_credits(id),
    order_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    price DECIMAL(20,6) NOT NULL,
    amount DECIMAL(20,6) NOT NULL,
    filled_amount DECIMAL(20,6) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB
);
```

### Trades
```sql
CREATE TABLE trades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    buyer_id UUID REFERENCES users(id),
    seller_id UUID REFERENCES users(id),
    credit_id UUID REFERENCES carbon_credits(id),
    amount DECIMAL(20,6) NOT NULL,
    price DECIMAL(20,6) NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL,
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    metadata JSONB
);
```

### Governance Proposals
```sql
CREATE TABLE governance_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    proposer_id UUID REFERENCES users(id),
    status VARCHAR(50) NOT NULL,
    start_block BIGINT NOT NULL,
    end_block BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    execution_data JSONB,
    metadata JSONB
);
```

### Votes
```sql
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID REFERENCES governance_proposals(id),
    voter_id UUID REFERENCES users(id),
    vote_type VARCHAR(20) NOT NULL,
    voting_power DECIMAL(20,6) NOT NULL,
    transaction_hash VARCHAR(66) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);
```

## Indexes

### Performance Indexes
```sql
-- Users
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_users_email ON users(email);

-- Projects
CREATE INDEX idx_projects_type ON projects(project_type);
CREATE INDEX idx_projects_status ON projects(status, verification_status);
CREATE INDEX idx_projects_location ON projects(country);

-- Carbon Credits
CREATE INDEX idx_credits_token ON carbon_credits(token_id);
CREATE INDEX idx_credits_owner ON carbon_credits(owner_address);
CREATE INDEX idx_credits_vintage ON carbon_credits(vintage_year);

-- Orders
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_type ON orders(order_type);

-- Trades
CREATE INDEX idx_trades_buyer ON trades(buyer_id);
CREATE INDEX idx_trades_seller ON trades(seller_id);
CREATE INDEX idx_trades_credit ON trades(credit_id);

-- Proposals
CREATE INDEX idx_proposals_status ON governance_proposals(status);
CREATE INDEX idx_proposals_blocks ON governance_proposals(start_block, end_block);
```

## Views

### Active Market Overview
```sql
CREATE VIEW v_market_overview AS
SELECT 
    p.project_type,
    COUNT(DISTINCT o.id) as open_orders,
    SUM(o.amount - o.filled_amount) as available_volume,
    AVG(o.price) as avg_price
FROM orders o
JOIN carbon_credits c ON o.credit_id = c.id
JOIN projects p ON c.project_id = p.id
WHERE o.status = 'active'
GROUP BY p.project_type;
```

### User Portfolio
```sql
CREATE VIEW v_user_portfolio AS
SELECT 
    u.id as user_id,
    p.project_type,
    COUNT(DISTINCT c.id) as credit_count,
    SUM(c.amount) as total_amount
FROM users u
JOIN carbon_credits c ON c.owner_address = u.wallet_address
JOIN projects p ON c.project_id = p.id
GROUP BY u.id, p.project_type;
```

## Triggers

### Update Timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### Credit Balance Check
```sql
CREATE OR REPLACE FUNCTION check_credit_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount > (
        SELECT available_credits 
        FROM projects 
        WHERE id = NEW.project_id
    ) THEN
        RAISE EXCEPTION 'Insufficient credits available';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER check_credit_creation
    BEFORE INSERT ON carbon_credits
    FOR EACH ROW
    EXECUTE FUNCTION check_credit_balance();
```
