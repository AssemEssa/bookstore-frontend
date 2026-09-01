import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getImageUrl } from '../utils/imageUrl';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { t } = useLanguage();

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(bookId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h2>{t('cart.empty')}</h2>
            <p>{t('cart.emptyText')}</p>
            <Link to="/books" className="btn btn-primary btn-lg">
              {t('cart.browse')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">{t('cart.title')}</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={getImageUrl(item.coverImage)}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-author">by {item.author}</p>
                  <p className="cart-item-price">£{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
                <div className="cart-item-total">
                  £{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">{t('cart.summary')}</h2>
            <div className="summary-row">
              <span>{t('cart.subtotal')}</span>
              <span>£{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>{t('cart.shipping')}</span>
              <span>£5.00</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>{t('cart.total')}</span>
              <span>£{(getCartTotal() + 5).toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-lg">
              {t('cart.checkout')}
            </Link>
            <Link to="/books" className="continue-shopping">
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
