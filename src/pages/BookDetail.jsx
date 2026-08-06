import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageUrl';
import './BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const { data } = await axios.get(`/api/books/${id}`);
      setBook(data.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    navigate('/cart');
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="book-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <div className="book-detail-container">
          <div className="book-detail-image">
            <img src={getImageUrl(book.coverImage)} alt={book.title} />
            {book.originalPrice > book.price && (
              <div className="discount-badge">
                Save {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}%
              </div>
            )}
          </div>

          <div className="book-detail-content">
            <div className="book-detail-category">{book.category}</div>
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>

            <div className="book-detail-rating">
              <span className="stars">{renderStars(book.rating)}</span>
              <span className="rating-text">
                {book.rating} ({book.numReviews} reviews)
              </span>
            </div>

            <div className="book-detail-price">
              <span className="current-price">${book.price}</span>
              {book.originalPrice > book.price && (
                <span className="original-price">${book.originalPrice}</span>
              )}
            </div>

            <div className="book-detail-stock">
              {book.stock > 0 ? (
                <span className="in-stock">✓ In Stock ({book.stock} available)</span>
              ) : (
                <span className="out-of-stock">✗ Out of Stock</span>
              )}
            </div>

            <div className="book-detail-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="btn btn-primary btn-lg"
              >
                Add to Cart
              </button>
            </div>

            <div className="book-detail-info">
              <h3>Book Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Publisher:</span>
                  <span className="info-value">{book.publisher || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Pages:</span>
                  <span className="info-value">{book.pages || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Language:</span>
                  <span className="info-value">{book.language}</span>
                </div>
                {book.isbn && (
                  <div className="info-item">
                    <span className="info-label">ISBN:</span>
                    <span className="info-value">{book.isbn}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="book-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
