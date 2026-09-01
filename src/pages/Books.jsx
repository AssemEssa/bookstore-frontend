import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getImageUrl } from '../utils/imageUrl';
import { getCategoryLabel, getCategoryOptions } from '../utils/categoryLabels';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    sort: '-createdAt',
  });
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const categories = getCategoryOptions(language);

  useEffect(() => {
    fetchBooks();
  }, [filters, currentPage]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All') {
        params.append('category', filters.category);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      params.append('sort', filters.sort);
      params.append('limit', '4'); // 4 books per page
      params.append('page', currentPage.toString());

      const { data } = await axios.get(`/api/books?${params}`);
      setBooks(data.data);
      setTotalPages(data.totalPages || 1);
      
      // Initialize quantities for all books
      const initialQuantities = {};
      data.data.forEach(book => {
        initialQuantities[book._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
    setCurrentPage(1); // Reset to page 1
  };

  const handleCategoryChange = (category) => {
    setFilters({ ...filters, category: category === 'All' ? '' : category });
    setCurrentPage(1); // Reset to page 1
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value });
    setCurrentPage(1); // Reset to page 1
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  const handleAddToCart = (book, e) => {
    e.preventDefault();
    e.stopPropagation();
    const quantity = quantities[book._id] || 1;
    addToCart(book, quantity);
  };

  const updateQuantity = (bookId, newQuantity, maxStock, e) => {
    e.preventDefault();
    e.stopPropagation();
    const validQuantity = Math.max(1, Math.min(maxStock, newQuantity));
    setQuantities(prev => ({
      ...prev,
      [bookId]: validQuantity
    }));
  };

  return (
    <div className="books-page">
      <div className="books-header">
        <div className="container">
          <h1 className="page-title">Browse Books</h1>
          <p className="page-subtitle">Explore our entire collection</p>
        </div>
      </div>

      <div className="container">
        <div className="books-container">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3 className="filter-title">Search</h3>
              <input
                type="text"
                className="search-input"
                placeholder="Search books..."
                value={filters.search}
                onChange={handleSearch}
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <div className="category-list">
                {categories.map((category) => (
                  <button
                    key={category.value || 'all'}
                    className={`category-btn ${
                      (category.value === '' && !filters.category) ||
                      filters.category === category.value
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => handleCategoryChange(category.value)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Sort By</h3>
              <select
                className="sort-select"
                value={filters.sort}
                onChange={handleSortChange}
              >
                <option value="-createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-rating">Highest Rated</option>
                <option value="title">Title: A to Z</option>
              </select>
            </div>
          </aside>

          {/* Books Grid */}
          <main className="books-grid-container">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <h3>No books found</h3>
                <p>Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="results-info">
                  <p>Showing {books.length} books</p>
                </div>
                <div className="books-grid">
                  {books.map((book) => (
                    <Link
                      to={`/books/${book._id}`}
                      key={book._id}
                      className="book-card"
                    >
                      <div className="book-card-image">
                        <img src={getImageUrl(book.coverImage)} alt={book.title} />
                        {book.originalPrice > book.price && (
                          <div className="book-badge">
                            {Math.round(
                              ((book.originalPrice - book.price) /
                                book.originalPrice) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      </div>
                      <div className="book-card-content">
                        <div className="book-category">{getCategoryLabel(book.category, language)}</div>
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <div className="book-rating">
                          <span className="stars">{renderStars(book.rating)}</span>
                          <span className="rating-count">({book.numReviews})</span>
                        </div>
                        <div className="book-stock-info">
                          {book.stock > 0 ? (
                            <span className="stock-available">
                              ✓ {book.stock} in stock
                            </span>
                          ) : (
                            <span className="stock-out">✗ Out of stock</span>
                          )}
                        </div>
                        <div className="book-footer">
                          <div className="book-price">
                            <span className="current-price">£{book.price}</span>
                            {book.originalPrice > book.price && (
                              <span className="original-price">
                                £{book.originalPrice}
                              </span>
                            )}
                          </div>
                          {book.stock > 0 && (
                            <div className="book-actions">
                              <div className="quantity-mini">
                                <button
                                  className="qty-btn"
                                  onClick={(e) => updateQuantity(book._id, (quantities[book._id] || 1) - 1, book.stock, e)}
                                  disabled={quantities[book._id] <= 1}
                                >
                                  −
                                </button>
                                <span className="qty-display">{quantities[book._id] || 1}</span>
                                <button
                                  className="qty-btn"
                                  onClick={(e) => updateQuantity(book._id, (quantities[book._id] || 1) + 1, book.stock, e)}
                                  disabled={quantities[book._id] >= book.stock}
                                >
                                  +
                                </button>
                              </div>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={(e) => handleAddToCart(book, e)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          )}
                          {book.stock === 0 && (
                            <button className="btn btn-disabled btn-sm" disabled>
                              Out of Stock
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Books;
