# AN Furnish - System Architecture

## 1. High-Level Architecture

```
Frontend (React/Next.js) ⇄ Backend API (Node.js/Express) ⇄ MongoDB
                               ↕
                        AI Services (External)
                               ↕
                         Queue Workers (BullMQ)
                               ↕
                           File Storage (S3)
```

### Core Components:

1. **Frontend Layer**
   - Customer-facing website (React/Next.js)
   - Admin dashboard for managing products and design requests
   - AR/3D visualization using model-viewer

2. **Backend Layer**
   - REST API server (Node.js/Express)
   - Authentication and session management
   - Business logic for product/portfolio management
   - Design request workflow orchestration

3. **Data Layer**
   - MongoDB for persistent data storage
   - S3-compatible storage for images and 3D models

4. **AI Services**
   - Gemini 2.5 Flash for conversational design assistance
   - Nano Banana for image generation
   - HuggingFace models for 2D→3D conversion

5. **Asynchronous Processing**
   - BullMQ with Redis for job queuing
   - Worker processes for heavy computational tasks

6. **Communication Services**
   - Email/SMS notifications
   - WhatsApp integration via Twilio

## 2. UX / Pages & Components

### Customer-Facing Pages:
- Landing page with hero section, categories, featured projects
- Category pages (Sofas, Chairs, Tables, Beds, Headboards, Curtains, Repairs)
- Product detail pages with carousel and specifications
- "Design With AI" interactive page
- Generated image detail page with 3D conversion option
- AR preview modal for mobile devices

### Admin Dashboard:
- Product/portfolio management (CRUD operations)
- Design request queue management
- 3D conversion job monitoring
- Order/lead tracking and management

## 3. Data Model

### User Schema (Optional)
```javascript
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "phone": String,
  "passwordHash": String,
  "createdAt": Date,
  "role": String // admin/customer
}
```

### Product Schema
```javascript
{
  "_id": ObjectId,
  "title": String,
  "category": String, // Sofa/Chair/Table/Bed/Headboard/Curtain/Repair
  "shortDescription": String,
  "detailedDescription": String,
  "materials": [String],
  "dimensions": {
    "w": Number, 
    "d": Number, 
    "h": Number
  },
  "photos": [String], // S3 URLs
  "tags": [String],
  "createdAt": Date,
  "published": Boolean
}
```

### DesignRequest Schema
```javascript
{
  "_id": ObjectId,
  "leadId": String, // human-friendly ID
  "customer": {
    "name": String, 
    "phone": String, 
    "email": String, 
    "city": String
  },
  "inputType": String, // "upload" | "text"
  "uploadedImages": [String], // S3 URLs
  "textPrompt": String,
  "collectedAnswers": {
    "dimensions": String, 
    "budget": String, 
    "preferredMaterials": String, 
    "deliveryTimeline": String
  },
  "llmPromptUsed": String,
  "generatedImages": [
    {
      "url": String, // S3 URL
      "prompt": String,
      "score": Number
    }
  ],
  "selectedImage": String, // S3 URL
  "status": String, // "new"|"images_generated"|"3d_requested"|"3d_ready"|"quoted"|"confirmed"|"production"|"delivered"|"rejected"
  "glbModel": String, // S3 URL to GLB model
  "craftsmanNotes": String,
  "assignedTo": ObjectId, // userId
  "createdAt": Date,
  "updatedAt": Date
}
```

### Order Schema (Future Implementation)
```javascript
{
  "_id": ObjectId,
  "leadId": String,
  "productRef": ObjectId, // Reference to Product or null
  "quote": {
    "amount": Number,
    "breakdown": [{
      "item": String,
      "cost": Number
    }]
  },
  "paymentStatus": String, // "pending"|"paid"|"partial"
  "deliveryStatus": String // "pending"|"shipped"|"delivered"
}
```

## 4. API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register (optional)
```

### Products (Admin)
```
GET /api/products (with filters: category, tag)
POST /api/products (admin only)
GET /api/products/:id
PUT /api/products/:id (admin only)
DELETE /api/products/:id (admin only)
```

### Design Requests / AI Flow
```
POST /api/designs (create new design request)
GET /api/designs/:id (view request status and assets)
POST /api/designs/:id/generate-images (trigger image generation)
POST /api/designs/:id/convert-3d (trigger 3D conversion)
GET /api/designs/:id/job/:jobId (check job status)
POST /api/designs/:id/submit-order (convert lead to order)
```

### Admin Functions
```
GET /api/admin/designs?status=... (filter by status)
PUT /api/admin/designs/:id (update status, assign craftsman, attach glb)
```

### File Uploads
```
POST /api/uploads (returns presigned S3 URL or accepts multipart)
```

## 5. Worker / AI Orchestration

### Queue System (BullMQ + Redis)

#### Workflow:
1. Design request created via `/api/designs`
2. Server enqueues `generate-images` job
3. Worker:
   - Calls Gemini to refine prompts (if needed)
   - Calls Nano Banana to generate images
   - Saves images to S3
   - Updates DB (status: `images_generated`)
4. Customer selects image and requests 3D conversion
5. Server enqueues `convert-3d` job
6. Worker:
   - Calls HF 2D→3D model
   - Produces glTF/GLB
   - Saves to S3
   - Updates DB (status: `3d_ready`)
7. Admin reviews and approves for AR viewing

## 6. Gemini 2.5 Flash Integration

### System Prompt:
"You are 'AN Furnish Design Assistant'. Your goal: help the user describe or upload a furniture design, ask for 4 required details (style, dimensions/room, material & fabric preference, budget & timeline), then produce 3 optimized image-generation prompts tailored for Nano Banana. Ask questions concisely, confirm measurements, and store answers so API can create a DesignRequest object. Keep tone friendly and local (India). After the user confirms, produce 3 short image prompts for the image model."

### Conversation Flow:
1. "Hi — what exact furniture would you like to design? Upload an image or describe it in one line (style, color, material)."
2. "Great — what's the approximate size or the room dimensions?"
3. "Material & fabric preference? Any color palette?"
4. "Budget range and expected delivery city/timeline?"

### Example Output Prompts:
1. "3-seater mid-century modern sofa, tufted back, teal velvet fabric, exposed walnut wooden legs, soft natural light, photorealistic, 45-degree angle, studio-quality"
2. "3-seater modern sectional with chaise, matte gray linen, low profile, brushed oak legs, lifestyle photo in a cozy living room"
3. "Classic chesterfield-inspired 3-seater, deep button tufting, maroon velvet, antique brass legs, high-detail close-up"

## 7. Nano Banana Image Generation

### API Call:
```
POST /nano-generate
{
  "prompt": "...",
  "userImageUrl": "... (optional)",
  "styleStrength": 0.6,
  "n": 3
}
```

### Response:
Array of image URLs (stored to S3)

### Best Practices:
- Keep images high-res (1024–2048 pixels)
- Use consistent lighting tags in prompts
- Apply seed or style tokens for repeatability

## 8. 2D → 3D Conversion Pipeline

### Options:

#### Option A: HF Hosted 2D→3D Model
1. Send selected 2D image to model
2. Model returns point cloud or voxel representation
3. Convert to mesh
4. Bake textures
5. Export glTF

#### Option B: Multi-View Approach
1. Generate 3-4 angled renders with Nano Banana
2. Pass multiple views to multi-view model
3. Produce point cloud
4. Apply Poisson surface reconstruction
5. UV unwrap and bake texture

#### Option C: Manual/Semi-Automated Fallback
1. Produce low-poly model automatically
2. Have in-house artist refine model

### Output Requirements:
- glTF or glb under 20MB
- Accurate real-world scaling
- Textured mesh with diffuse + normal maps

### Recommended HF Models:
- Point-E (OpenAI)
- PixelNeRF or other NeRF implementations
- Mesh reconstruction tools that convert point clouds to textured models

## 9. AR & Web 3D Viewer

### Frontend Implementation:
- Primary: `<model-viewer>` component (Google)
- Fallback: WebXR support

### Platform-Specific Handling:
- **iOS**: Use `<a href="model.usdz" rel="ar">` for Quick Look (requires USDA/USDC/USDZ format)
- **Android**: `<model-viewer>` with Scene Viewer when `ar` attribute enabled

### Features:
- Real-world scale mapping (meters)
- UI controls: rotate, zoom, scale input
- "Place in room" button for mobile

## 10. Admin Workflow

### Key Features:
- Product CRUD operations + bulk CSV upload
- Portfolio gallery management (mark favorites/featured items)
- Incoming design request queue with previews
- "Approve 3D" functionality with craftsman notes and quoting
- Quote creation and customer communication via WhatsApp/email
- Production tracking with status updates
- Lead export to CSV

## 11. Security, Privacy & Compliance

### Data Handling:
- User consent for storing images and generated content
- Auto-deletion of drafts after X days
- Presigned S3 URLs for secure uploads
- Input sanitization and file type validation (jpg/png/webp only)

### Protection Measures:
- Rate limiting on image-generation endpoints
- CAPTCHA implementation to prevent abuse
- Secure storage and rotation of API keys for external services

## 12. Performance & Cost Optimization

### Caching Strategies:
- Cache generated images for repeat requests
- Resize and compress images for frontend delivery (WebP format)

### Cost Management:
- Use smaller LLM context for short conversational steps
- Limit 2D→3D conversions to preserve GPU quota
- Implement manual fallback for expensive operations

## 13. Phased Rollout Plan

### Phase 1 (MVP - 2-4 weeks):
- Portfolio + landing page + product catalog + contact forms
- Basic LLM chatbot using Gemini for text-only flow
- Nano Banana integration for 2D designs
- Admin panel for lead management

### Phase 2 (4-8 weeks):
- HF 2D→3D pipeline integration (limited product types)
- Web 3D viewer and AR functionality
- Lead quoting workflow
- Measurement assistance prompts

### Phase 3 (8-16+ weeks):
- Refined 2D→3D quality (multi-view generation)
- Automated USDZ conversion for iOS AR
- Checkout and payment integration
- Nationwide logistics integration

## 14. Developer Checklist

- [ ] Create Next.js project with Tailwind CSS
- [ ] Setup MongoDB Atlas cluster and connection
- [ ] Implement REST API (Express + Mongoose) with authentication
- [ ] Setup S3-compatible storage and presigned upload endpoint
- [ ] Integrate Gemini 2.5 Flash with prompt management
- [ ] Integrate Nano Banana with worker job for image generation
- [ ] Research and test HF 2D→3D models
- [ ] Implement model-viewer frontend with AR fallback
- [ ] Build Admin dashboard for product and lead management
- [ ] Add WhatsApp API integration (Twilio/Meta)
- [ ] Implement logging, metrics, and backup systems

## 15. Sample Payloads

### Create Design Request
```
POST /api/designs
{
  "customer": {
    "name": "Ravi",
    "phone": "98765",
    "email": "ravi@example.com",
    "city": "Bangalore"
  },
  "inputType": "text",
  "textPrompt": "3-seater mid-century sofa, teal velvet, wooden legs",
  "collectedAnswers": {
    "dimensions": "210x90x85cm",
    "budget": "70000-100000",
    "preferredMaterials": "Velvet, teak"
  }
}
```

### Generate Images (Server Trigger)
```
POST /api/designs/{id}/generate-images
```
Worker calls Nano Banana with 3 prompts from Gemini → returns three image URLs

### Convert to 3D
```
POST /api/designs/{id}/convert-3d
```
Worker calls HF 2D→3D endpoint with selected image → returns glbUrl

## 16. Ready-to-Use Prompts

### Gemini System Prompt:
"You are AN Furnish Design Assistant. Your job: ask the user 4 required details — (1) brief description or upload, (2) approximate size or room dimensions, (3) material/fabric preference & color palette, (4) budget & delivery city/timeline. After collecting answers, create 3 optimized image-generation prompts (one-line each) for an image model. Keep language short and friendly. If the user uploaded an image, ask if they want similar styling or different."

### Nano Banana Image Prompt:
"3-seater mid-century modern sofa, tufted back, teal velvet fabric, exposed walnut legs, photorealistic, 45-degree angle, studio lighting, high detail, realistic textures"

### 2D→3D Conversion Instruction:
"Input: selected image (JPEG) plus dimensions (width=2.1m). Task: produce a textured glTF/glb model, scale-correct to real-world meters, with baked diffuse + normal maps, under 20MB. Export glb and provide preview screenshot."

## 17. UX Copy Snippets

- **Hero CTA**: "Design Your Furniture — AI + Craftsman"
- **Design Page**: "Upload or describe a design. Our AI will create realistic options — pick one to preview in your room."
- **Enquiry Button**: "Enquire / Save Design" (opens WhatsApp or contact form)
- **Admin Note**: "Craftsman feasibility: High / Medium / Low — add manufacturing notes."