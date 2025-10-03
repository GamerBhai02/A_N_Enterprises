# AN Furnish - AI-Powered Furniture E-Commerce Platform

Welcome to AN Furnish, a cutting-edge e-commerce platform for furniture and home goods with integrated AI design capabilities. Our platform combines seamless shopping with advanced AI tools to help customers visualize and create custom furniture designs.

## Features

- **E-Commerce Functionality**
  - Product catalog with detailed information
  - Shopping cart and checkout process
  - Order confirmation and tracking
  - Responsive design for all devices

- **AI-Powered Design**
  - Google's Gemini API integration for AI-generated furniture designs
  - Text-to-design: Describe your ideal furniture piece in words
  - Image-to-design: Upload inspiration images for AI enhancement
  - 2D to 3D conversion for realistic previews
  - AR (Augmented Reality) preview to see furniture in your space

- **Technical Stack**
  - Next.js App Router with React Server Components
  - TypeScript for type safety
  - Tailwind CSS for styling
  - MongoDB for data persistence
  - AWS S3 for file storage
  - Google Generative AI (Gemini) for AI capabilities

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- Node.js (v16 or higher)
- MongoDB Atlas account
- Google Cloud account with Gemini API enabled
- AWS account with S3 bucket created

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/an-furnish.git
cd an-furnish
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/an-furnish?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name-here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is designed to be deployed on Vercel, Netlify, or Render. The Next.js App Router provides excellent support for these platforms.

### Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Make sure to configure the environment variables in the Vercel dashboard:
- MONGODB_URI
- GEMINI_API_KEY
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- S3_BUCKET_NAME

### Deploy on Netlify

1. Push your code to a GitHub repository
2. Sign in to Netlify and select "New site from Git"
3. Choose your repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `out` (after running `npm run export` for static export) or use serverless functions
5. Add environment variables in the Netlify dashboard

### Deploy on Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the start command to `npm start`
5. Add environment variables in the Render dashboard

## API Routes

- `GET /api/health` - Health check endpoint
- `POST /api/ai/gemini` - Gemini AI integration for text and image generation
- `POST /api/upload` - File upload to S3
- `POST /api/convert/2d-to-3d` - 2D image to 3D model conversion

## Environment Variables

| Variable | Description |
|--------|-------------|
| MONGODB_URI | MongoDB connection string |
| GEMINI_API_KEY | Google Gemini API key |
| AWS_ACCESS_KEY_ID | AWS access key ID |
| AWS_SECRET_ACCESS_KEY | AWS secret access key |
| AWS_REGION | AWS region (e.g., us-east-1) |
| S3_BUCKET_NAME | Name of the S3 bucket for file storage |

## Project Structure

```
an-furnish/
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── ai/            # AI-related endpoints
│   │   │   ├── convert/       # 2D to 3D conversion
│   │   │   ├── health/        # Health check
│   │   │   └── upload/        # File upload
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── confirmation/      # Order confirmation page
│   │   ├── design/            # AI design interface
│   │   ├── product/[id]/      # Dynamic product page
│   │   └── layout.tsx         # Main layout component
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utility functions and libraries
│   │   └── db/                # Database connection
│   └── types/                # TypeScript type definitions
├── .env.local                # Environment variables (local)
├── next.config.js            # Next.js configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License.