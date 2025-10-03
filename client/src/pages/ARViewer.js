import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '@google/model-viewer';

const ARViewer = () => {
  const { id } = useParams();
  const modelViewerRef = useRef(null);
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
    // Check if AR is supported
    if (modelViewerRef.current) {
      setArSupported(modelViewerRef.current.canActivateAR);
    }
  }, []);

  const handleARView = () => {
    if (modelViewerRef.current && modelViewerRef.current.canActivateAR) {
      modelViewerRef.current.activateAR();
    }
  };

  const handleRotate = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = '0deg 90deg 0deg';
    }
  };

  const handleZoomIn = () => {
    // Zoom functionality would be implemented here
    alert('Zoom in functionality would be implemented in a full version');
  };

  const handleZoomOut = () => {
    // Zoom functionality would be implemented here
    alert('Zoom out functionality would be implemented in a full version');
  };

  return (
    <div className="container">
      <h2>3D Preview in Your Space</h2>
      <p>View and interact with your furniture design in augmented reality.</p>
      
      <div style={{ position: 'relative', height: '500px', marginTop: '30px' }}>
        <model-viewer
          ref={modelViewerRef}
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          alt="3D Model"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          environment-image="neutral"
          shadow-intensity="1"
          style={{ width: '100%', height: '100%' }}
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
            View in your space
          </button>
        </model-viewer>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button className="btn" onClick={handleRotate}>Rotate</button>
        <button className="btn" onClick={handleZoomIn}>Zoom In</button>
        <button className="btn" onClick={handleZoomOut}>Zoom Out</button>
        {arSupported && (
          <button className="btn" onClick={handleARView} style={{ backgroundColor: '#28a745' }}>
            View in AR
          </button>
        )}
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button className="btn" style={{ backgroundColor: '#ffc107', color: '#000' }}>
          Request Quote
        </button>
        <button className="btn" style={{ marginLeft: '10px' }}>
          Back to Designs
        </button>
      </div>
    </div>
  );
};

export default ARViewer;