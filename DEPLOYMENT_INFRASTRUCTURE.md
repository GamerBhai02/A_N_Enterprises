# Deployment and Infrastructure Setup

## Overview

This document outlines the deployment strategy and infrastructure requirements for the AN Furnish platform. The architecture is designed for scalability, reliability, and cost-effectiveness while supporting all platform features including AI services, 3D visualization, and AR capabilities.

## Infrastructure Architecture

### Cloud Provider
**AWS** is recommended for the following services:
- EC2 instances for application hosting
- S3 for image and 3D model storage
- RDS for MongoDB Atlas (managed MongoDB service)
- Elastic Beanstalk for application deployment
- CloudFront for content delivery
- SES for email notifications
- SNS for SMS notifications

### Component Architecture

```
Internet
    ↓
Route 53 (DNS)
    ↓
CloudFront CDN
    ↓
Application Load Balancer
    ↓
Auto Scaling Group
    ↘       ↘
  EC2      EC2
Instances  Instances
    ↓       ↓
  Docker  Docker
Containers Containers
    ↓       ↓
Backend   Frontend
(API)     (Next.js)

    ↘       ↙
     MongoDB Atlas
        ↓
       S3 Bucket
  (Images & 3D Models)

    ↗       ↖
   Redis     Twilio
 (Queue)   (Messaging)

    ↗           ↖
Gemini API    Nano Banana API
              ↖
            HuggingFace API
```

## Deployment Environments

### 1. Development Environment
- Purpose: Local development and feature testing
- Resources: Developer machines with Docker
- Data: Local MongoDB instance
- Services: All services run locally or use sandbox APIs

### 2. Staging Environment
- Purpose: Integration testing and QA validation
- Resources:
  - EC2 t3.medium instance (2 vCPU, 4GB RAM)
  - MongoDB Atlas M10 cluster
  - S3 bucket for assets
  - Redis instance for queues
- URL: staging.anfurnish.com

### 3. Production Environment
- Purpose: Live customer-facing application
- Resources:
  - Auto Scaling Group with 2+ EC2 t3.large instances
  - MongoDB Atlas M20+ cluster
  - S3 bucket with CloudFront CDN
  - Redis cluster for queues
  - SSL certificate via AWS Certificate Manager
- URL: www.anfurnish.com

## Detailed Setup Instructions

### 1. AWS Account Setup
1. Create AWS account
2. Set up IAM users and roles with appropriate permissions
3. Configure billing alerts
4. Enable required services:
   - EC2
   - S3
   - RDS (MongoDB Atlas)
   - Elastic Beanstalk
   - CloudFront
   - SES
   - SNS

### 2. Domain and DNS Configuration
1. Register domain (anfurnish.com) through Route 53 or transfer existing
2. Configure DNS records:
   - A record for root domain pointing to Load Balancer
   - CNAME for www subdomain
   - CNAME for staging environment
   - MX records for email services

### 3. SSL Certificate Configuration
1. Request SSL certificate through AWS Certificate Manager
2. Validate domain ownership
3. Configure certificate for:
   - Primary domain (www.anfurnish.com)
   - Root domain (anfurnish.com)
   - Staging domain (staging.anfurnish.com)

### 4. S3 Bucket Setup
1. Create buckets:
   - `anfurnish-assets` (for product images)
   - `anfurnish-generated` (for AI-generated content)
   - `anfurnish-models` (for 3D models)
2. Configure bucket policies for:
   - Public read access for assets
   - Private access for generated content with presigned URLs
   - Lifecycle policies for automatic deletion of temporary files

### 5. MongoDB Atlas Configuration
1. Create MongoDB Atlas account
2. Set up cluster:
   - Provider: AWS
   - Region: Same as EC2 instances for low latency
   - Tier: M10 for staging, M20+ for production
3. Configure network access:
   - Whitelist IP addresses
   - Set up VPC peering if needed
4. Create database user with appropriate permissions

### 6. Redis Setup
1. For staging: Use AWS ElastiCache Redis (cache.t3.micro)
2. For production: Use Redis cluster (cache.t3.medium or larger)
3. Configure security groups to allow access from application servers
4. Set up authentication and encryption

### 7. Application Deployment

#### Backend API (Express)
1. Create Elastic Beanstalk application:
   ```
   eb init anfurnish-api --platform node.js
   ```
2. Configure environment variables:
   - DATABASE_URL
   - REDIS_URL
   - API_KEYS for external services
   - JWT_SECRET
3. Deploy application:
   ```
   eb deploy
   ```

#### Frontend (Next.js)
1. Build static files:
   ```
   npm run build
   ```
2. Deploy to S3 bucket with CloudFront:
   - Configure S3 static website hosting
   - Set up CloudFront distribution
   - Configure custom domain and SSL
   - Set up caching policies

### 8. CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [ main, staging ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to Elastic Beanstalk
      uses: einaregilsson/beanstalk-deploy@v21
      with:
        aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        application_name: anfurnish-api
        environment_name: ${{ github.ref == 'refs/heads/main' && 'Production' || 'Staging' }}
        version_label: ${{ github.sha }}
        region: us-east-1
        deployment_package: deploy.zip
```

## Monitoring and Logging

### Application Monitoring
1. **AWS CloudWatch** for:
   - EC2 instance metrics
   - Application logs
   - Custom metrics
2. **Health checks**:
   - API endpoint responsiveness
   - Database connectivity
   - External service availability

### Performance Monitoring
1. **Application Performance Monitoring (APM)**:
   - New Relic or DataDog integration
   - Response time tracking
   - Error rate monitoring
2. **Frontend monitoring**:
   - Page load times
   - JavaScript errors
   - User experience metrics

### Logging Strategy
1. **Structured logging**:
   - JSON format for all application logs
   - Centralized log aggregation in CloudWatch
2. **Log retention**:
   - 30 days for application logs
   - 90 days for audit logs
   - Archival for compliance requirements

## Security Configuration

### Network Security
1. **Security Groups**:
   - Restrict inbound traffic to necessary ports only
   - Separate security groups for web, database, and worker tiers
2. **VPC Configuration**:
   - Private subnets for database and backend services
   - Public subnets for frontend services
   - NAT gateways for outbound traffic from private subnets

### Data Security
1. **Encryption**:
   - HTTPS/TLS for all data in transit
   - Encryption at rest for S3 buckets and database
2. **Access Control**:
   - IAM roles with least privilege principle
   - Database user permissions
   - API key management

### Application Security
1. **Input Validation**:
   - Sanitize all user inputs
   - Validate file uploads
   - Prevent injection attacks
2. **Authentication**:
   - JWT-based authentication
   - Password hashing with bcrypt
   - Session management

## Backup and Disaster Recovery

### Data Backup Strategy
1. **Database Backups**:
   - Daily snapshots of MongoDB Atlas cluster
   - Point-in-time recovery enabled
   - Cross-region replication for critical data
2. **Asset Backups**:
   - S3 versioning enabled
   - Cross-region replication for critical assets
   - Lifecycle policies for cost optimization

### Disaster Recovery Plan
1. **Recovery Time Objective (RTO)**: 4 hours
2. **Recovery Point Objective (RPO)**: 24 hours
3. **Recovery Procedures**:
   - Automated failover for database
   - Blue-green deployment for application
   - Static asset recovery from S3

## Cost Optimization

### Resource Optimization
1. **Auto Scaling**:
   - Scale based on CPU utilization
   - Scheduled scaling for predictable traffic patterns
2. **Reserved Instances**:
   - Purchase reserved instances for baseline capacity
   - Utilize spot instances for worker processes

### Storage Optimization
1. **S3 Lifecycle Policies**:
   - Transition infrequently accessed data to Glacier
   - Automatically delete temporary files
2. **Content Delivery**:
   - Use CloudFront for global content delivery
   - Cache frequently accessed assets

### Service Optimization
1. **Database**:
   - Right-size MongoDB Atlas cluster based on usage
   - Enable compression and indexing
2. **External APIs**:
   - Implement caching for AI service responses
   - Batch requests where possible

## Maintenance Procedures

### Regular Maintenance Tasks
1. **Weekly**:
   - Review application logs for errors
   - Check backup status and integrity
   - Update security patches
2. **Monthly**:
   - Review and optimize resource usage
   - Update SSL certificates
   - Performance testing and optimization

### Update Procedures
1. **Application Updates**:
   - Deploy to staging environment first
   - Run integration tests
   - Deploy to production during low-traffic periods
2. **Infrastructure Updates**:
   - Use infrastructure-as-code (CloudFormation/Terraform)
   - Test changes in isolated environments
   - Implement rollback procedures

## Scalability Considerations

### Horizontal Scaling
1. **Application Tier**:
   - Auto Scaling Groups based on demand
   - Load balancing across multiple instances
2. **Database Tier**:
   - MongoDB sharding for large datasets
   - Read replicas for improved performance

### Performance Optimization
1. **Caching Strategy**:
   - Redis for session storage and job queues
   - CloudFront for static asset delivery
   - Application-level caching for frequently accessed data
2. **Database Optimization**:
   - Proper indexing strategies
   - Query optimization
   - Connection pooling

This deployment and infrastructure setup provides a robust foundation for the AN Furnish platform, ensuring high availability, security, and scalability as the user base grows.