# Deploying AN Furnish to Vercel

This guide will walk you through deploying the AN Furnish e-commerce platform to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (free at [vercel.com](https://vercel.com))
3. All required API keys and credentials:
   - MongoDB Atlas connection string
   - Google Gemini API key
   - AWS S3 credentials (access key, secret key, bucket name, region)

## Step-by-Step Deployment Guide

### 1. Prepare Your Codebase

Ensure your entire A N Enterprises folder is in a GitHub repository:
1. Create a new repository on GitHub
2. Push your entire A N Enterprises folder to the repository:
   ```bash
   # From the A N Enterprises directory
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: `an-furnish` (this is important - Vercel needs to know where your Next.js app is)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Configure Environment Variables

In the Vercel dashboard, go to your project settings and add the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://username:password@cluster.mongodb.net/database` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSyB4Gz...` |
| `AWS_ACCESS_KEY_ID` | AWS access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS region | `us-east-1` |
| `S3_BUCKET_NAME` | S3 bucket name | `an-furnish-uploads` |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL | `https://your-site.vercel.app` |
| `JWT_SECRET` | Secret for JWT tokens | `your-super-secret-jwt-key` |

### 4. Deploy

1. Click "Deploy" in the Vercel dashboard
2. Wait for the deployment to complete (usually takes 1-3 minutes)
3. Your site will be available at the provided URL

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. In your Vercel project dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

### 2. Environment-Specific Settings

You can configure different environment variables for preview, production, and development environments in the Vercel dashboard.

## Troubleshooting

### Common Issues

1. **Build Failures**: Check the build logs in the Vercel dashboard for specific error messages
2. **Environment Variables Not Set**: Ensure all required environment variables are configured in the Vercel dashboard
3. **MongoDB Connection Issues**: Verify your MongoDB URI is correct and your IP is whitelisted in MongoDB Atlas
4. **API Key Issues**: Ensure your Google Gemini API key and AWS credentials are valid

### Checking Logs

1. Go to your project in the Vercel dashboard
2. Click on the "Logs" tab
3. Select the deployment you want to inspect
4. View real-time logs for your application

## Local Development vs Production

When developing locally, you use `.env.local` for environment variables. On Vercel, you must configure these through the dashboard as shown above.

## Scaling and Performance

Vercel automatically handles scaling for your Next.js application. For optimal performance:

1. Use Vercel's built-in analytics to monitor your site's performance
2. Consider using Vercel's Edge Network for global content delivery
3. Optimize images using Next.js's built-in Image component
4. Use ISR (Incremental Static Regeneration) for content that changes infrequently

## Updating Your Deployment

To update your deployed application:

1. Push changes to your GitHub repository
2. Vercel will automatically trigger a new deployment
3. You can also manually trigger a deployment from the Vercel dashboard

## Support

For issues with this deployment guide, please check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [AN Furnish README](./README.md)