import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">About BookHaven</h3>
          <p className="footer-text">
            Your premium destination for discovering and purchasing books. 
            We curate the finest collection of literature from around the world.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">💼</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/books">Browse Books</Link></li>
            <li><Link to="/books?featured=true">Featured</Link></li>
            <li><Link to="/books?bestseller=true">Bestsellers</Link></li>
            <li><Link to="/books">Categories</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Customer Service</h3>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p className="footer-text">
            Subscribe to get special offers and updates!
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email"
              className="newsletter-input"
            />
            <button className="btn btn-primary btn-sm">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 BookHaven. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <span>•</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
