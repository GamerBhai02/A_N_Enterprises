<<<<<<< HEAD
# AN Furnish - AI-Powered Furniture Design Platform

## Overview

AN Furnish is a comprehensive furniture design platform that allows customers to:
- Describe or upload their furniture design ideas
- Receive AI-generated visualizations using advanced image generation
- Preview 3D models of their designs in augmented reality
- Connect with craftsmen for production

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB
- Redis
- npm (comes with Node.js)

## Setup Instructions

1. **Clone the repository** (if not already done)
   ```
   git clone <repository-url>
   cd an-furnish
   ```

2. **Install dependencies**
   ```
   npm install
   cd client
   npm install
   cd ..
   ```

   Or use the setup script:
   ```
   node setup.js
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your actual configuration

4. **Start required services**
   - Start MongoDB
   - Start Redis server

5. **Run the application**
   
   For development:
   ```
   npm run dev
   ```
   
   Or use the batch script:
   ```
   dev.bat
   ```

   For production:
   ```
   npm start
   ```
   
   Or use the batch script:
   ```
   start.bat
   ```

## Project Structure

```
an-furnish/
├── client/              # React frontend
│   ├── public/          # Static assets
│   └── src/             # React components and pages
├── models/              # Mongoose models
├── routes/              # Express routes
├── services/            # External service integrations
├── workers/             # Background job processors
├── .env.example         # Environment variables template
├── server.js            # Express server entry point
└── package.json         # Project dependencies and scripts
```

## Features

### Frontend (React)
- Responsive design for all device sizes
- Product browsing and details
- AI design assistant interface
- 3D model viewer with AR capabilities
- Admin dashboard for content management

### Backend (Node.js/Express)
- RESTful API for all frontend interactions
- MongoDB integration for data persistence
- Redis integration for job queue processing
- Authentication and authorization
- File upload handling with AWS S3

### AI Services
- Gemini 2.5 Flash integration for conversational design assistance
- Nano Banana integration for image generation
- HuggingFace integration for 2D to 3D conversion

### Workers
- BullMQ workers for background job processing
- Image generation queue
- 3D model conversion queue

## Development

### Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts both frontend and backend in development mode
- `npm run dev:server` - Starts the backend server in development mode
- `npm run dev:client` - Starts the frontend client in development mode
- `npm start` - Starts the production server
- `npm run build` - Builds the frontend for production

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/an-furnish

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name

# AI Service API Keys
GEMINI_API_KEY=your-gemini-api-key
```

## Deployment

The application can be deployed to any cloud platform that supports Node.js applications. Ensure the following:

1. Environment variables are properly configured
2. MongoDB and Redis services are available
3. AWS S3 bucket is configured for file storage
4. Proper security measures are in place for API keys

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
=======
# A_N_Enterprises
>>>>>>> eb8abc90b01d6c95db70fc566e64b64b3df9c0af
