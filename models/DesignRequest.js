const mongoose = require('mongoose');

const designRequestSchema = new mongoose.Schema({
  leadId: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true }
  },
  inputType: {
    type: String,
    required: true,
    enum: ['upload', 'text']
  },
  uploadedImages: [{
    type: String
  }],
  textPrompt: {
    type: String,
    trim: true
  },
  collectedAnswers: {
    dimensions: { type: String, trim: true },
    budget: { type: String, trim: true },
    preferredMaterials: { type: String, trim: true },
    deliveryTimeline: { type: String, trim: true }
  },
  llmPromptUsed: {
    type: String
  },
  generatedImages: [{
    url: { type: String },
    prompt: { type: String },
    score: { type: Number, default: 0 }
  }],
  selectedImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'images_generated', '3d_requested', '3d_ready', 'quoted', 'confirmed', 'production', 'delivered', 'rejected'],
    default: 'new'
  },
  glbModel: {
    type: String
  },
  craftsmanNotes: {
    type: String
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DesignRequest', designRequestSchema);