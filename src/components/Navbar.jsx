import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getCartCount } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📚</span>
          <span className="brand-text">BookHaven</span>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">{t('nav.home')}</Link>
          <Link to="/books" className="nav-link">{t('nav.books')}</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">{t('nav.profile')}</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">
                  {t('nav.admin')}
                </Link>
              )}
              <button onClick={handleLogout} className="nav-link btn-link">
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">{t('nav.login')}</Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                {t('nav.signup')}
              </Link>
            </>
          )}

          <LanguageSwitcher />

          <Link to="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
