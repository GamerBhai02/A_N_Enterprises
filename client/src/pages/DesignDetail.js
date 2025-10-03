import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DesignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock generated images
  const generatedImages = [
    {
      id: 1,
      url: 'https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Design+1',
      prompt: '3-seater mid-century modern sofa, tufted back, teal velvet fabric, exposed walnut wooden legs'
    },
    {
      id: 2,
      url: 'https://via.placeholder.com/400x300/4ECDC4/FFFFFF?text=Design+2',
      prompt: '3-seater modern sectional with chaise, matte gray linen, low profile, brushed oak legs'
    },
    {
      id: 3,
      url: 'https://via.placeholder.com/400x300/45B7D1/FFFFFF?text=Design+3',
      prompt: 'Classic chesterfield-inspired 3-seater, deep button tufting, maroon velvet, antique brass legs'
    }
  ];

  const handleSelectImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleConvertTo3D = () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }
    // In a real app, this would trigger the 3D conversion process
    // For now, we'll navigate to the AR viewer
    navigate(`/ar/${id}`);
  };

  return (
    <div className="container">
      <h2>AI-Generated Designs</h2>
      <p>Select your favorite design to preview in 3D or request a quote.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
        {generatedImages.map(image => (
          <div 
            key={image.id} 
            className="product-card"
            style={{ 
              border: selectedImage === image.url ? '3px solid #61dafb' : '1px solid #ddd',
              cursor: 'pointer'
            }}
            onClick={() => handleSelectImage(image.url)}
          >
            <img src={image.url} alt={`Generated design ${image.id}`} />
            <div className="product-card-content">
              <p>{image.prompt}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedImage && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <button className="btn" onClick={handleConvertTo3D}>
            Convert to 3D & Preview in AR
          </button>
          <button className="btn" style={{ marginLeft: '10px', backgroundColor: '#28a745' }}>
            Enquire / Save Design
          </button>
        </div>
      )}
      
      {!selectedImage && (
        <div style={{ marginTop: '30px', textAlign: 'center', color: '#666' }}>
          <p>Select a design to continue</p>
        </div>
      )}
    </div>
  );
};

export default DesignDetail;