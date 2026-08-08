import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getImageUrl } from '../utils/imageUrl';
import { getCategoryLabel } from '../utils/categoryLabels';
import './Home.css';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { language } = useLanguage();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const [featuredRes, bestsellerRes] = await Promise.all([
        axios.get('/api/books?featured=true&limit=3'),
        axios.get('/api/books?bestseller=true&limit=6'),
      ]);

      setFeaturedBooks(featuredRes.data.data);
      setBestsellers(bestsellerRes.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>⭐</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half">⭐</span>);
    }

    return <div className="stars">{stars}</div>;
  };

  const handleAddToCart = (book, e) => {
    e.stopPropagation();
    addToCart(book);
  };

  const BookCard = ({ book }) => (
    <Link to={`/books/${book._id}`} className="book-card">
      <div className="book-card-image">
        <img src={getImageUrl(book.coverImage)} alt={book.title} />
        {book.originalPrice > book.price && (
          <div className="book-badge">
            {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>
      <div className="book-card-content">
        <div className="book-category">{getCategoryLabel(book.category, language)}</div>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <div className="book-rating">
          {renderStars(book.rating)}
          <span className="rating-count">({book.numReviews})</span>
        </div>
        <div className="book-footer">
          <div className="book-price">
            <span className="current-price">£{book.price}</span>
            {book.originalPrice > book.price && (
              <span className="original-price">£{book.originalPrice}</span>
            )}
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => handleAddToCart(book, e)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next
              <span className="highlight">Great Read</span>
            </h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium books across all genres.
              From timeless classics to contemporary bestsellers, find your perfect book today.
            </p>
            <div className="hero-buttons">
              <Link to="/books" className="btn btn-white btn-lg">
                Browse Collection
              </Link>
              <Link to="/books?featured=true" className="btn btn-outline btn-lg">
                Featured Books
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="book-stack">
              <div className="book-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200')" }}></div>
              <div className="book-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200')" }}></div>
              <div className="book-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1614544048536-0d28caf77f41?w=200')" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Handpicked</span>
            <h2 className="section-title">Featured Books</h2>
            <p className="section-subtitle">
              Carefully selected titles that we absolutely love
            </p>
          </div>
          <div className="grid grid-3">
            {featuredBooks.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Books Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.8★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Popular</span>
            <h2 className="section-title">Bestsellers</h2>
            <p className="section-subtitle">
              The most loved books by our community
            </p>
          </div>
          <div className="grid grid-3">
            {bestsellers.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/books" className="btn btn-primary btn-lg">
              View All Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
