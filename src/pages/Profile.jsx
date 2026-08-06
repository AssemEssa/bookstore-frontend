import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/myorders');
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      processing: 'var(--accent)',
      shipped: 'var(--primary)',
      delivered: 'var(--success)',
      cancelled: 'var(--danger)',
    };
    return colors[status] || 'var(--gray-500)';
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="profile-name">{user?.name}</h2>
                <p className="profile-email">{user?.email}</p>
                {user?.role === 'admin' && (
                  <span className="badge badge-primary">Admin</span>
                )}
              </div>
            </div>
          </div>

          <div className="orders-section">
            <h2 className="section-title">Order History</h2>
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div>
                        <p className="order-id">Order #{order._id.slice(-8)}</p>
                        <p className="order-date">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <img
                            src={item.book?.coverImage}
                            alt={item.book?.title}
                          />
                          <div className="order-item-details">
                            <p className="order-item-title">{item.book?.title}</p>
                            <p className="order-item-quantity">Qty: {item.quantity}</p>
                          </div>
                          <span className="order-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <span className="order-total-label">Total:</span>
                      <span className="order-total">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
