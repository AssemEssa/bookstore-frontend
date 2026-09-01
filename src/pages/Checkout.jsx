import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUrl';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    phoneNumber: '',
    country: '',
    paymentMethod: 'cash_on_delivery',
  });

  const currency = '£';

  const subtotal = getCartTotal();
  const shippingCost = 5;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          book: item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
        subtotal,
        tax,
        shippingCost,
        total,
      };

      const response = await axios.post('/api/orders', orderData);
      clearCart();
      alert(response.data.message || 'Order placed successfully! Stock has been updated.');
      navigate('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
      const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
      alert(errorMessage);
      
      // If stock error, refresh the page to show updated stock
      if (errorMessage.includes('stock')) {
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div className="checkout-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2 className="section-title">Shipping Address</h2>
              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="street"
                  className="form-input"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="form-input"
                    placeholder="+44 1234 567890"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-input"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💵</span>
                    <span className="payment-text">Cash on Delivery</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="instapay"
                    checked={formData.paymentMethod === 'instapay'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">📱</span>
                    <span className="payment-text">Instapay</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="etisalat_cash"
                    checked={formData.paymentMethod === 'etisalat_cash'}
                    onChange={handleChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-icon">💳</span>
                    <span className="payment-text">Etisalat Cash</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          <div className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <img src={getImageUrl(item.coverImage)} alt={item.title} />
                  <div>
                    <p className="item-title">{item.title}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">{currency}{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{currency}{shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>{currency}{tax.toFixed(2)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
