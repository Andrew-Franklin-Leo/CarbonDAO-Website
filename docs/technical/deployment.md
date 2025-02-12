---
sidebar_position: 4
---

# Deployment Guide

## Infrastructure Overview

CarbonDAO's infrastructure is designed for high availability, scalability, and security. This guide covers the deployment and maintenance of all system components.

## System Requirements

### Production Environment
- Kubernetes cluster (min. 3 nodes)
- Node.js v18+
- PostgreSQL 14+
- Redis 6+
- IPFS node
- Ethereum node (or provider)

### Resource Requirements

```yaml
Minimum Node Specifications:
  CPU: 4 cores
  RAM: 16GB
  Storage: 100GB SSD

Database:
  Type: PostgreSQL
  Version: 14+
  Storage: 500GB SSD
  RAM: 32GB

Cache:
  Type: Redis
  Version: 6+
  Storage: 100GB SSD
  RAM: 16GB
```

## Deployment Architecture

### Component Layout

```mermaid
graph TD
    A[Load Balancer] --> B[API Gateway]
    B --> C[Web Server]
    B --> D[API Server]
    D --> E[Database]
    D --> F[Cache]
    D --> G[Blockchain Node]
    D --> H[IPFS Node]
```

## Infrastructure Setup

### Kubernetes Configuration

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: carbondao-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: carbondao-api
  template:
    metadata:
      labels:
        app: carbondao-api
    spec:
      containers:
      - name: api
        image: carbondao/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: carbondao-secrets
              key: database-url
        resources:
          limits:
            cpu: "2"
            memory: "4Gi"
          requests:
            cpu: "1"
            memory: "2Gi"
```

### Database Setup

```sql
-- Initial database setup
CREATE DATABASE carbondao;
CREATE USER carbondao WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE carbondao TO carbondao;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

## Deployment Process

### 1. Environment Configuration

```bash
# Create configuration
kubectl create secret generic carbondao-secrets \
  --from-literal=database-url="postgresql://user:pass@host:5432/db" \
  --from-literal=redis-url="redis://host:6379" \
  --from-literal=ethereum-rpc="https://eth-node:8545"

# Create ConfigMap
kubectl create configmap carbondao-config \
  --from-file=./config/production.json
```

### 2. Smart Contract Deployment

```typescript
async function deployContracts() {
  console.log('Deploying smart contracts...');
  
  // Deploy contracts
  const CarbonCreditToken = await ethers.getContractFactory("CarbonCreditToken");
  const token = await CarbonCreditToken.deploy();
  await token.deployed();
  
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(token.address);
  await marketplace.deployed();
  
  // Verify contracts
  await hre.run("verify:verify", {
    address: token.address,
    constructorArguments: []
  });
  
  console.log('Contracts deployed and verified');
}
```

### 3. Application Deployment

```bash
# Deploy API
kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/api-service.yaml

# Deploy Web App
kubectl apply -f k8s/web-deployment.yaml
kubectl apply -f k8s/web-service.yaml

# Deploy Workers
kubectl apply -f k8s/workers-deployment.yaml
```

## Monitoring Setup

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'carbondao-api'
    static_configs:
      - targets: ['carbondao-api:3000']
  
  - job_name: 'carbondao-web'
    static_configs:
      - targets: ['carbondao-web:3000']
```

### Grafana Dashboards

```json
{
  "dashboard": {
    "title": "CarbonDAO Operations",
    "panels": [
      {
        "title": "API Response Time",
        "type": "graph",
        "datasource": "Prometheus",
        "targets": [
          {
            "expr": "http_request_duration_seconds"
          }
        ]
      }
    ]
  }
}
```

## Backup Procedures

### Database Backup

```bash
#!/bin/bash
# backup.sh

# Set variables
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_NAME="carbondao"

# Create backup
pg_dump $DB_NAME > $BACKUP_DIR/backup_$TIMESTAMP.sql

# Compress backup
gzip $BACKUP_DIR/backup_$TIMESTAMP.sql

# Upload to secure storage
aws s3 cp $BACKUP_DIR/backup_$TIMESTAMP.sql.gz \
  s3://carbondao-backups/database/
```

## Scaling Guidelines

### Horizontal Scaling

```yaml
# autoscaling.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: carbondao-api
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: carbondao-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Maintenance Procedures

### Database Maintenance

```sql
-- Regular maintenance tasks
VACUUM ANALYZE;
REINDEX DATABASE carbondao;

-- Monitor table sizes
SELECT schemaname, relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

### Cache Management

```typescript
async function maintainCache() {
  // Clear expired entries
  await redis.execute('EXPIRE', 'market_data', 3600);
  
  // Refresh frequently accessed data
  await cache.warmUp([
    'latest_prices',
    'active_orders',
    'project_stats'
  ]);
}
```

## Troubleshooting Guide

### Common Issues

1. **Pod Crashes**
```bash
# Check pod logs
kubectl logs -f pod/carbondao-api-xyz

# Check pod events
kubectl describe pod carbondao-api-xyz
```

2. **Database Connectivity**
```bash
# Check database connection
pg_isready -h $DB_HOST -p $DB_PORT

# Check connection pool
SELECT * FROM pg_stat_activity;
```

### Emergency Procedures

1. **Service Degradation**
```bash
# Enable maintenance mode
kubectl scale deployment carbondao-api --replicas=0
kubectl apply -f maintenance-page.yaml

# Rollback deployment
kubectl rollout undo deployment/carbondao-api
```

2. **Data Recovery**
```bash
# Restore from backup
pg_restore -d carbondao latest_backup.sql

# Verify data integrity
SELECT verify_data_integrity();
```

## Security Measures

### Network Security

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: carbondao-api-policy
spec:
  podSelector:
    matchLabels:
      app: carbondao-api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: carbondao-web
    ports:
    - protocol: TCP
      port: 3000
```

## Update Procedures

### Zero-Downtime Updates

```bash
# Update with zero downtime
kubectl set image deployment/carbondao-api \
  carbondao-api=carbondao/api:new-version

# Monitor rollout
kubectl rollout status deployment/carbondao-api

# Verify update
kubectl get pods -l app=carbondao-api