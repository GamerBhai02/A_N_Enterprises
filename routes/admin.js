const express = require('express');
const DesignRequest = require('../models/DesignRequest');
const Product = require('../models/Product');

const router = express.Router();

// GET /api/admin/designs?status=...
router.get('/designs', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    const designRequests = await DesignRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email');
      
    res.json(designRequests);
  } catch (error) {
    console.error('Error fetching design requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/designs/:id - update status, assign craftsman, attach glb
router.put('/designs/:id', async (req, res) => {
  try {
    const { status, craftsmanNotes, assignedTo, glbModel } = req.body;
    const updateData = {};
    
    if (status) updateData.status = status;
    if (craftsmanNotes) updateData.craftsmanNotes = craftsmanNotes;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (glbModel) updateData.glbModel = glbModel;
    
    const designRequest = await DesignRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');
    
    if (!designRequest) {
      return res.status(404).json({ message: 'Design request not found' });
    }
    
    res.json(designRequest);
  } catch (error) {
    console.error('Error updating design request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/products/:id - update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;