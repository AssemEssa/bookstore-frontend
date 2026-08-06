import { useState, useEffect } from 'react';
import axios from 'axios';
import { getImageUrl } from '../utils/imageUrl';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Fiction',
    stock: '',
    coverImage: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'books') {
        const { data } = await axios.get('/api/books?limit=50');
        setBooks(data.data);
      } else if (activeTab === 'orders') {
        const { data } = await axios.get('/api/orders');
        setOrders(data.data);
      } else if (activeTab === 'users') {
        const { data } = await axios.get('/api/users');
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(bookForm).forEach(key => {
        if (bookForm[key]) {
          formData.append(key, bookForm[key]);
        }
      });

      // Append image file if selected
      if (imageFile) {
        formData.append('coverImage', imageFile);
      }

      await axios.post('/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowModal(false);
      setBookForm({
        title: '',
        author: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Fiction',
        stock: '',
        coverImage: '',
      });
      setImageFile(null);
      setImagePreview('');
      fetchData();
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/api/books/${id}`);
        fetchData();
        alert('Book deleted successfully!');
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { orderStatus: status });
      fetchData();
      alert('Order status updated!');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    }
  };

  return (
    <div className="admin-page">
      <div className="container-fluid">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your bookstore</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            📚 Books
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {activeTab === 'books' && (
                <div className="books-section">
                  <div className="section-header">
                    <h2>All Books</h2>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      + Add New Book
                    </button>
                  </div>
                  <div className="admin-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Cover</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr key={book._id}>
                            <td>
                              <img
                                src={getImageUrl(book.coverImage)}
                                alt={book.title}
                                className="table-img"
                              />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>${book.price}</td>
                            <td>{book.stock}</td>
                            <td>
                              <button
                                className="btn-danger btn-sm"
                                onClick={() => handleDeleteBook(book._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-section">
                  <h2>All Orders</h2>
                  <div className="admin-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id}>
                            <td>#{order._id.slice(-8)}</td>
                            <td>{order.user?.name}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                              <span className={`status-badge ${order.orderStatus}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                              <select
                                className="status-select"
                                value={order.orderStatus}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(order._id, e.target.value)
                                }
                              >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="users-section">
                  <h2>All Users</h2>
                  <div className="admin-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <span className={`badge badge-${user.role === 'admin' ? 'primary' : 'success'}`}>
                                {user.role}
                              </span>
                            </td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Add Book Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 className="modal-title">Add New Book</h2>
              <form onSubmit={handleAddBook}>
                <div className="form-group">
                  <label className="form-label">Book Cover Image</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <label htmlFor="coverImage" className="file-input-label">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                      ) : (
                        <div className="upload-placeholder">
                          <span className="upload-icon">📷</span>
                          <span>Click to upload image</span>
                          <span className="upload-hint">JPEG, PNG, GIF, WebP (Max 5MB)</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Or use Image URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                    value={bookForm.coverImage}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, coverImage: e.target.value })
                    }
                  />
                  <small className="form-hint">Leave blank if uploading a file above</small>
                </div>

                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={bookForm.title}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-input"
                    value={bookForm.author}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, author: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input form-textarea"
                    value={bookForm.description}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={bookForm.price}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Original Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={bookForm.originalPrice}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, originalPrice: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      className="form-input"
                      value={bookForm.category}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, category: e.target.value })
                      }
                    >
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Mystery</option>
                      <option>Thriller</option>
                      <option>Romance</option>
                      <option>Sci-Fi</option>
                      <option>Fantasy</option>
                      <option>Biography</option>
                      <option>History</option>
                      <option>Self-Help</option>
                      <option>Business</option>
                      <option>Technology</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-input"
                      value={bookForm.stock}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, stock: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowModal(false)}
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Add Book'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
