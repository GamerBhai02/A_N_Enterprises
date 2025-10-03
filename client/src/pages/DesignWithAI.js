import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DesignWithAI = () => {
  const [inputType, setInputType] = useState('text');
  const [textPrompt, setTextPrompt] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    city: ''
  });
  const [collectedAnswers, setCollectedAnswers] = useState({
    dimensions: '',
    budget: '',
    preferredMaterials: '',
    deliveryTimeline: ''
  });
  const navigate = useNavigate();

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleAnswersChange = (e) => {
    setCollectedAnswers({
      ...collectedAnswers,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would submit to your API
    // For now, we'll just navigate to a mock design detail page
    navigate('/design/123');
  };

  return (
    <div className="container">
      <h2>Design Your Furniture with AI</h2>
      <p>Describe your furniture idea and our AI will create realistic designs for you.</p>
      
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '30px auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>
            <strong>How would you like to start?</strong>
          </label>
          <div style={{ marginTop: '10px' }}>
            <label style={{ marginRight: '20px' }}>
              <input
                type="radio"
                value="text"
                checked={inputType === 'text'}
                onChange={(e) => setInputType(e.target.value)}
              />
              Describe your design
            </label>
            <label>
              <input
                type="radio"
                value="upload"
                checked={inputType === 'upload'}
                onChange={(e) => setInputType(e.target.value)}
              />
              Upload an image
            </label>
          </div>
        </div>
        
        {inputType === 'text' && (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="textPrompt"><strong>Describe your furniture design:</strong></label>
            <textarea
              id="textPrompt"
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="e.g., 3-seater mid-century modern sofa, teal velvet, wooden legs"
              style={{ width: '100%', height: '100px', marginTop: '10px', padding: '10px' }}
              required
            />
          </div>
        )}
        
        {inputType === 'upload' && (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="imageUpload"><strong>Upload your design inspiration:</strong></label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ marginTop: '10px', padding: '10px' }}
            />
          </div>
        )}
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Your Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleCustomerInfoChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                required
              />
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Design Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '10px' }}>
            <div>
              <label htmlFor="dimensions">Approximate Dimensions or Room Size</label>
              <input
                type="text"
                id="dimensions"
                name="dimensions"
                value={collectedAnswers.dimensions}
                onChange={handleAnswersChange}
                placeholder="e.g., 200x90x85cm or 12x15ft room"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label htmlFor="budget">Budget Range</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={collectedAnswers.budget}
                onChange={handleAnswersChange}
                placeholder="e.g., ₹50,000 - ₹1,00,000"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label htmlFor="preferredMaterials">Material & Fabric Preference</label>
              <input
                type="text"
                id="preferredMaterials"
                name="preferredMaterials"
                value={collectedAnswers.preferredMaterials}
                onChange={handleAnswersChange}
                placeholder="e.g., Velvet, Teak wood"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div>
              <label htmlFor="deliveryTimeline">Delivery Timeline</label>
              <input
                type="text"
                id="deliveryTimeline"
                name="deliveryTimeline"
                value={collectedAnswers.deliveryTimeline}
                onChange={handleAnswersChange}
                placeholder="e.g., 4-6 weeks"
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="btn" style={{ width: '100%', padding: '12px' }}>
          Generate AI Designs
        </button>
      </form>
    </div>
  );
};

export default DesignWithAI;