# Technical Implementation Plan

## Project Setup

### 1. Initialize Next.js Project
```bash
npx create-next-app@latest an-furnish --typescript --tailwind --eslint
cd an-furnish
```

### 2. Install Additional Dependencies
```bash
# Backend/API dependencies
npm install express mongoose dotenv cors helmet morgan
npm install bullmq redis
npm install aws-sdk multer multer-s3
npm install jsonwebtoken bcryptjs

# Frontend dependencies
npm install @google/model-viewer
npm install axios
npm install react-query

# Development dependencies
npm install --save-dev @types/express @types/node nodemon ts-node
```

## Backend Architecture

### 1. Project Structure
```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── workers/
│   └── utils/
├── config/
└── server.ts
```

### 2. Database Models (Mongoose)

#### User Model
```typescript
// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: Date;
  role: 'admin' | 'customer';
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
});

export default mongoose.model<IUser>('User', UserSchema);
```

#### Product Model
```typescript
// src/models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  materials: string[];
  dimensions: {
    w: number;
    d: number;
    h: number;
  };
  photos: string[];
  tags: string[];
  createdAt: Date;
  published: boolean;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  materials: [{ type: String }],
  dimensions: {
    w: { type: Number, required: true },
    d: { type: Number, required: true },
    h: { type: Number, required: true }
  },
  photos: [{ type: String }],
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
```

#### DesignRequest Model
```typescript
// src/models/DesignRequest.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ICustomer {
  name: string;
  phone: string;
  email: string;
  city: string;
}

interface IGeneratedImage {
  url: string;
  prompt: string;
  score: number;
}

interface ICollectedAnswers {
  dimensions: string;
  budget: string;
  preferredMaterials: string;
  deliveryTimeline: string;
}

export interface IDesignRequest extends Document {
  leadId: string;
  customer: ICustomer;
  inputType: 'upload' | 'text';
  uploadedImages: string[];
  textPrompt: string;
  collectedAnswers: ICollectedAnswers;
  llmPromptUsed: string;
  generatedImages: IGeneratedImage[];
  selectedImage: string;
  status: 'new' | 'images_generated' | '3d_requested' | '3d_ready' | 'quoted' | 'confirmed' | 'production' | 'delivered' | 'rejected';
  glbModel: string;
  craftsmanNotes: string;
  assignedTo: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DesignRequestSchema: Schema = new Schema({
  leadId: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true }
  },
  inputType: { type: String, enum: ['upload', 'text'], required: true },
  uploadedImages: [{ type: String }],
  textPrompt: { type: String },
  collectedAnswers: {
    dimensions: { type: String },
    budget: { type: String },
    preferredMaterials: { type: String },
    deliveryTimeline: { type: String }
  },
  llmPromptUsed: { type: String },
  generatedImages: [{
    url: { type: String },
    prompt: { type: String },
    score: { type: Number }
  }],
  selectedImage: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'images_generated', '3d_requested', '3d_ready', 'quoted', 'confirmed', 'production', 'delivered', 'rejected'],
    default: 'new'
  },
  glbModel: { type: String },
  craftsmanNotes: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

export default mongoose.model<IDesignRequest>('DesignRequest', DesignRequestSchema);
```

## API Implementation

### 1. Express Server Setup
```typescript
// server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productRoutes from './src/routes/products';
import designRoutes from './src/routes/designs';
import authRoutes from './src/routes/auth';
import adminRoutes from './src/routes/admin';
import uploadRoutes from './src/routes/uploads';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/an-furnish')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
```

### 2. Authentication Routes
```typescript
// src/routes/auth.ts
import express from 'express';
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    // Implementation for login
    // Validate credentials
    // Generate JWT token
    // Return user data and token
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/register (optional)
router.post('/register', async (req, res) => {
  try {
    // Implementation for registration
    // Hash password
    // Create user
    // Generate JWT token
    // Return user data and token
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

### 3. Product Routes
```typescript
// src/routes/products.ts
import express from 'express';
const router = express.Router();

// GET /api/products (filters: category, tag)
router.get('/', async (req, res) => {
  try {
    // Implementation to fetch products with filters
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/products (admin)
router.post('/', async (req, res) => {
  try {
    // Implementation to create a new product (admin only)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    // Implementation to fetch a specific product
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/products/:id (admin)
router.put('/:id', async (req, res) => {
  try {
    // Implementation to update a product (admin only)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/products/:id (admin)
router.delete('/:id', async (req, res) => {
  try {
    // Implementation to delete a product (admin only)
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

### 4. Design Request Routes
```typescript
// src/routes/designs.ts
import express from 'express';
const router = express.Router();

// POST /api/designs - create new design request
router.post('/', async (req, res) => {
  try {
    // Implementation to create a new design request
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/designs/:id - view request status & assets
router.get('/:id', async (req, res) => {
  try {
    // Implementation to fetch a design request
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/generate-images - triggers Nano Banana
router.post('/:id/generate-images', async (req, res) => {
  try {
    // Implementation to trigger image generation
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/convert-3d - triggers HF 2D→3D conversion
router.post('/:id/convert-3d', async (req, res) => {
  try {
    // Implementation to trigger 3D conversion
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/designs/:id/job/:jobId - job status
router.get('/:id/job/:jobId', async (req, res) => {
  try {
    // Implementation to check job status
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/designs/:id/submit-order - convert lead to order
router.post('/:id/submit-order', async (req, res) => {
  try {
    // Implementation to convert lead to order
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
```

## Worker Implementation (BullMQ)

### 1. Queue Configuration
```typescript
// src/workers/queue.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import Redis from 'ioredis';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Create queues
export const imageGenerationQueue = new Queue('imageGeneration', { connection });
export const modelConversionQueue = new Queue('modelConversion', { connection });

// Queue events
export const imageGenerationQueueEvents = new QueueEvents('imageGeneration', { connection });
export const modelConversionQueueEvents = new QueueEvents('modelConversion', { connection });
```

### 2. Image Generation Worker
```typescript
// src/workers/imageGenerationWorker.ts
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { generateImagesWithNanoBanana } from '../services/nanoBananaService';
import DesignRequest from '../models/DesignRequest';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const imageGenerationWorker = new Worker('imageGeneration', async job => {
  const { designId, prompts } = job.data;
  
  try {
    // Call Nano Banana API to generate images
    const generatedImages = await generateImagesWithNanoBanana(prompts);
    
    // Update design request with generated images
    await DesignRequest.findByIdAndUpdate(designId, {
      generatedImages: generatedImages.map((url, index) => ({
        url,
        prompt: prompts[index],
        score: 0 // Initial score
      })),
      status: 'images_generated'
    });
    
    return { success: true, images: generatedImages };
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}, { connection });

export default imageGenerationWorker;
```

### 3. 3D Model Conversion Worker
```typescript
// src/workers/modelConversionWorker.ts
import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { convertTo3DWithHuggingFace } from '../services/huggingFaceService';
import DesignRequest from '../models/DesignRequest';

const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const modelConversionWorker = new Worker('modelConversion', async job => {
  const { designId, imageUrl, dimensions } = job.data;
  
  try {
    // Call HuggingFace API to convert image to 3D model
    const glbUrl = await convertTo3DWithHuggingFace(imageUrl, dimensions);
    
    // Update design request with 3D model URL
    await DesignRequest.findByIdAndUpdate(designId, {
      glbModel: glbUrl,
      status: '3d_ready'
    });
    
    return { success: true, modelUrl: glbUrl };
  } catch (error) {
    console.error('3D conversion failed:', error);
    throw error;
  }
}, { connection });

export default modelConversionWorker;
```

## AI Service Integrations

### 1. Gemini Integration
```typescript
// src/services/geminiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateImagePrompts(conversationHistory: any[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const chat = model.startChat({
    history: conversationHistory,
  });
  
  const prompt = "Based on our conversation, please generate 3 optimized image-generation prompts for Nano Banana. Each prompt should be a single line and focus on different aspects of the design.";
  
  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return response.text();
}

export async function chatWithGemini(message: string, conversationHistory: any[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const chat = model.startChat({
    history: conversationHistory,
  });
  
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}
```

### 2. Nano Banana Integration
```typescript
// src/services/nanoBananaService.ts
import axios from 'axios';

export async function generateImagesWithNanoBanana(prompts: string[]) {
  const generatedImages = [];
  
  for (const prompt of prompts) {
    try {
      const response = await axios.post('https://api.nanobanana.com/generate', {
        prompt,
        styleStrength: 0.6,
        n: 1
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NANO_BANANA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      generatedImages.push(response.data.imageUrl);
    } catch (error) {
      console.error('Nano Banana API error:', error);
      throw error;
    }
  }
  
  return generatedImages;
}
```

### 3. HuggingFace Integration
```typescript
// src/services/huggingFaceService.ts
import axios from 'axios';

export async function convertTo3DWithHuggingFace(imageUrl: string, dimensions: any) {
  try {
    const response = await axios.post('https://api-inference.huggingface.co/models/some-2d-to-3d-model', {
      inputs: imageUrl,
      parameters: {
        dimensions: dimensions
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    });
    
    // Save the GLB file to S3 and return the URL
    // Implementation would depend on your S3 setup
    return saveGLBToS3(response.data);
  } catch (error) {
    console.error('HuggingFace API error:', error);
    throw error;
  }
}

async function saveGLBToS3(data: ArrayBuffer) {
  // Implementation to save GLB file to S3 and return URL
  // This would use the AWS SDK
  return "https://your-s3-bucket.s3.amazonaws.com/models/model.glb";
}
```

## Frontend Implementation

### 1. Next.js Page Structure
```
pages/
├── index.tsx (Landing page)
├── categories/
│   ├── [category].tsx (Category pages)
├── products/
│   ├── [id].tsx (Product detail page)
├── design/
│   ├── index.tsx (Design with AI page)
│   ├── [id]/
│       ├── index.tsx (Generated image detail)
│       └── 3d-preview.tsx (3D preview)
├── admin/
│   ├── dashboard.tsx (Admin dashboard)
│   ├── products.tsx (Product management)
│   ├── designs.tsx (Design request management)
│   └── orders.tsx (Order management)
└── api/
    └── hello.ts (Example API route)
```

### 2. AR Component Implementation
```tsx
// components/ARViewer.tsx
import React, { useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'ios-src'?: string;
          'camera-controls'?: boolean;
          'environment-image'?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface ARViewerProps {
  glbUrl: string;
  usdzUrl: string;
  dimensions: { w: number; h: number; d: number };
}

const ARViewer: React.FC<ARViewerProps> = ({ glbUrl, usdzUrl, dimensions }) => {
  const [viewerType, setViewerType] = useState<'web' | 'ar'>('web');

  return (
    <div className="ar-viewer">
      {viewerType === 'web' ? (
        <model-viewer
          src={glbUrl}
          alt="3D Model"
          ar={true}
          ar-modes="webxr scene-viewer quick-look"
          camera-controls={true}
          environment-image="neutral"
          style={{ width: '100%', height: '400px' }}
        />
      ) : (
        <a href={usdzUrl} rel="ar">
          <img src="/placeholder-ar.png" alt="AR Preview" />
          <p>View in AR</p>
        </a>
      )}
      
      <div className="viewer-controls">
        <button onClick={() => setViewerType('web')}>
          3D Viewer
        </button>
        <button onClick={() => setViewerType('ar')}>
          AR View
        </button>
      </div>
    </div>
  );
};

export default ARViewer;
```

### 3. Design Chat Component
```tsx
// components/DesignChat.tsx
import React, { useState } from 'react';
import axios from 'axios';

const DesignChat: React.FC = () => {
  const [messages, setMessages] = useState<{text: string, sender: 'user' | 'ai'}[]>([
    { text: "Hi! What furniture would you like to design today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Send message to backend API
      const response = await axios.post('/api/designs/chat', {
        message: input,
        conversationHistory: messages
      });
      
      // Add AI response
      const aiMessage = { text: response.data.reply, sender: 'ai' as const };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = { text: "Sorry, I encountered an error. Please try again.", sender: 'ai' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="design-chat">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai">Thinking...</div>}
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Describe your furniture design..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default DesignChat;
```

## Environment Configuration

### 1. Environment Variables (.env)
```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/an-furnish

# Redis
REDIS_URL=redis://localhost:6379

# APIs
GEMINI_API_KEY=your_gemini_api_key
NANO_BANANA_API_KEY=your_nano_banana_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name

# Authentication
JWT_SECRET=your_jwt_secret_key

# Twilio (for WhatsApp)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
```

## Development Workflow

### 1. Running the Application
```bash
# Start Redis (required for BullMQ)
redis-server

# Start the backend server
npm run dev:server

# In another terminal, start the Next.js frontend
npm run dev
```

### 2. Testing Workers
```bash
# Start workers in separate terminals
npm run worker:image-generation
npm run worker:model-conversion
```

## Deployment Considerations

### 1. Production Build
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### 2. Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000 3001

CMD ["npm", "start"]
```

### 3. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
    environment:
      - NODE_ENV=production
    depends_on:
      - mongodb
      - redis

  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  redis_data:
```

## Monitoring and Maintenance

### 1. Health Checks
Implement health check endpoints:
- `/health` for basic server health
- `/health/database` for MongoDB connectivity
- `/health/redis` for Redis connectivity

### 2. Logging
Use structured logging with Winston or similar libraries to track:
- API requests and responses
- Worker job processing
- Error conditions
- Performance metrics

### 3. Error Handling
Implement centralized error handling middleware for Express:
- Validation errors
- Database errors
- External API errors
- Unexpected errors

This technical implementation plan provides a comprehensive foundation for building the AN Furnish platform. Each component can be developed and tested independently before integration.