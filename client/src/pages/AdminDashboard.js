import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');

  // Mock data
  const designRequests = [
    { id: '1', customer: 'Ravi Kumar', status: 'images_generated', createdAt: '2023-06-15' },
    { id: '2', customer: 'Priya Sharma', status: '3d_ready', createdAt: '2023-06-14' },
    { id: '3', customer: 'Amit Patel', status: 'new', createdAt: '2023-06-13' }
  ];

  const products = [
    { id: '1', title: 'Modern Sofa', category: 'Sofa', published: true },
    { id: '2', title: 'Ergonomic Chair', category: 'Chair', published: true },
    { id: '3', title: 'Dining Table', category: 'Table', published: false }
  ];

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
            <h3>Quick Stats</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>24</div>
                <div>New Requests</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>8</div>
                <div>In Progress</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</div>
                <div>Completed</div>
              </div>
            </div>
          </div>
          
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
            <h3>Recent Activity</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                Ravi Kumar submitted a new design request
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                3D model generated for Priya Sharma's design
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                New product "Modern Sofa" added to catalog
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
            <button 
              onClick={() => setActiveTab('products')}
              style={{ 
                padding: '10px 20px', 
                background: activeTab === 'products' ? '#61dafb' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('designs')}
              style={{ 
                padding: '10px 20px', 
                background: activeTab === 'designs' ? '#61dafb' : 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Design Requests
            </button>
          </div>
          
          {activeTab === 'products' && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Product Management</h3>
                <button className="btn">Add New Product</button>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.title}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.category}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        {product.published ? 'Published' : 'Draft'}
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <button style={{ marginRight: '10px' }}>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'designs' && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Design Requests</h3>
                <div>
                  <select style={{ padding: '5px', marginRight: '10px' }}>
                    <option>All Statuses</option>
                    <option>New</option>
                    <option>Images Generated</option>
                    <option>3D Ready</option>
                  </select>
                  <button className="btn">Filter</button>
                </div>
              </div>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Customer</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {designRequests.map(request => (
                    <tr key={request.id}>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.customer}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          borderRadius: '4px', 
                          backgroundColor: 
                            request.status === 'new' ? '#ffc107' : 
                            request.status === 'images_generated' ? '#17a2b8' : 
                            '#28a745',
                          color: 'white'
                        }}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.createdAt}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <button style={{ marginRight: '10px' }}>View</button>
                        <button>Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;