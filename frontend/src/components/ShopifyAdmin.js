import React, { useState, useEffect } from 'react';
import { Store, RefreshCw, Plus, ExternalLink, Database, RotateCcw } from 'lucide-react';

const ShopifyAdmin = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState({});
  const [newShopDomain, setNewShopDomain] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/shopify/stores`);
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInstallApp = () => {
    if (!newShopDomain.trim()) {
      alert('Please enter a shop domain');
      return;
    }

    const shopDomain = newShopDomain.includes('.myshopify.com') 
      ? newShopDomain 
      : `${newShopDomain}.myshopify.com`;

    // Redirect to Shopify installation URL
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/shopify/install?shop=${shopDomain}`;
  };

  const handleSyncStore = async (shopDomain) => {
    try {
      setSyncLoading(prev => ({ ...prev, [shopDomain]: true }));
      
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/shopify/sync/${shopDomain}`, 
        { method: 'POST' }
      );
      const data = await response.json();
      
      alert(`Synced ${data.products_count} products from ${shopDomain}`);
      await fetchStores(); // Refresh stores list
    } catch (error) {
      console.error('Error syncing store:', error);
      alert('Failed to sync store products');
    } finally {
      setSyncLoading(prev => ({ ...prev, [shopDomain]: false }));
    }
  };

  const handleViewProducts = async (shopDomain) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/shopify/products/${shopDomain}`
      );
      const data = await response.json();
      
      console.log('Store products:', data);
      alert(`Found ${data.count} products from ${shopDomain}. Check console for details.`);
    } catch (error) {
      console.error('Error fetching store products:', error);
    }
  };

  return (
    <div className="shopify-admin">
      <div className="admin-header">
        <div className="header-title">
          <Store size={32} />
          <h2>Shopify Store Management</h2>
        </div>
        <p className="header-description">
          Connect your Shopify stores to NXTLVL to sync products and manage inventory
        </p>
      </div>

      {/* Install New Store */}
      <div className="install-section">
        <h3>
          <Plus size={20} />
          Connect New Shopify Store
        </h3>
        <div className="install-form">
          <div className="input-group">
            <input
              type="text"
              value={newShopDomain}
              onChange={(e) => setNewShopDomain(e.target.value)}
              placeholder="your-store-name"
              className="shop-input"
            />
            <span className="domain-suffix">.myshopify.com</span>
          </div>
          <button
            onClick={handleInstallApp}
            className="btn-primary install-btn"
            disabled={!newShopDomain.trim()}
          >
            <Plus size={16} />
            Install NXTLVL App
          </button>
        </div>
        <p className="install-help">
          Enter your Shopify store domain to install the NXTLVL app and sync your products
        </p>
      </div>

      {/* Connected Stores */}
      <div className="stores-section">
        <div className="section-header">
          <h3>
            <Database size={20} />
            Connected Stores ({stores.length})
          </h3>
          <button
            onClick={fetchStores}
            className="btn-secondary refresh-btn"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'spinning' : ''} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <RefreshCw size={24} className="spinning" />
            <p>Loading stores...</p>
          </div>
        ) : stores.length === 0 ? (
          <div className="empty-state">
            <Store size={48} />
            <h4>No Stores Connected</h4>
            <p>Connect your first Shopify store to start syncing products with NXTLVL</p>
          </div>
        ) : (
          <div className="stores-grid">
            {stores.map((store) => (
              <div key={store.id} className="store-card">
                <div className="store-header">
                  <div className="store-info">
                    <h4>{store.shop_domain}</h4>
                    <span className="store-plan">{store.plan_name || 'Basic'}</span>
                  </div>
                  <div className="store-status">
                    <span className="status-badge active">Active</span>
                  </div>
                </div>

                <div className="store-details">
                  <p><strong>Owner:</strong> {store.owner || 'N/A'}</p>
                  <p><strong>Email:</strong> {store.email || 'N/A'}</p>
                  <p><strong>Installed:</strong> {new Date(store.installed_at).toLocaleDateString()}</p>
                </div>

                <div className="store-actions">
                  <button
                    onClick={() => handleSyncStore(store.shop_domain)}
                    className="btn-secondary sync-btn"
                    disabled={syncLoading[store.shop_domain]}
                  >
                    <RotateCcw size={16} className={syncLoading[store.shop_domain] ? 'spinning' : ''} />
                    {syncLoading[store.shop_domain] ? 'Syncing...' : 'Sync Products'}
                  </button>
                  <button
                    onClick={() => handleViewProducts(store.shop_domain)}
                    className="btn-secondary view-btn"
                  >
                    <ExternalLink size={16} />
                    View Products
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions-section">
        <h3>Setup Instructions</h3>
        <div className="instructions-grid">
          <div className="instruction-card">
            <div className="step-number">1</div>
            <h4>Create Shopify App</h4>
            <p>Go to your Shopify Partner Dashboard and create a new app with the required API permissions</p>
          </div>
          <div className="instruction-card">
            <div className="step-number">2</div>
            <h4>Configure API Keys</h4>
            <p>Add your Shopify API key and secret to the backend environment variables</p>
          </div>
          <div className="instruction-card">
            <div className="step-number">3</div>
            <h4>Install & Sync</h4>
            <p>Use the form above to install the app on your Shopify stores and sync products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopifyAdmin;