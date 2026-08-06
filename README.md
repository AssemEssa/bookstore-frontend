# 📚 Bookstore Frontend

React + Vite frontend for the Bookstore application.

## 🚀 Features

- Modern React with Hooks
- Vite for fast development
- Responsive design
- Shopping cart
- User authentication
- Admin dashboard
- Bilingual support (English/Arabic)
- RTL support

## 📋 Requirements

- Node.js 18+
- Backend API running

## 🔧 Installation

```bash
npm install
```

## ⚙️ Configuration

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

For production:
```env
VITE_API_URL=https://your-backend.onrender.com
```

## 🏃 Running

### Development:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

## 📱 Pages

- **Home** - Featured books and bestsellers
- **Books** - Browse all books with filters
- **Book Detail** - Individual book information
- **Cart** - Shopping cart
- **Checkout** - Order placement
- **Login/Register** - Authentication
- **Profile** - User profile and orders
- **Admin Dashboard** - Manage books, orders, users

## 🎨 Features

- Responsive design (mobile, tablet, desktop)
- Smooth animations
- Premium UI with gradients
- Search and filter
- Category browsing
- Language switcher (🌐 English/Arabic)
- RTL layout support
- Image preview
- Order tracking

## 🌍 Bilingual Support

Switch between English and Arabic with full RTL support:
- Click the 🌐 button in navbar
- Automatically saves preference
- All pages translated
- Right-to-left layout for Arabic

## 🔐 Demo Credentials

### Admin:
- Email: `admin@bookstore.com`
- Password: `admin123`

### Customer:
- Email: `john@example.com`
- Password: `password123`

## 📦 Dependencies

- react
- react-router-dom
- axios
- vite

## 🚀 Deployment

See `DEPLOYMENT-GUIDE.md` for detailed deployment instructions.

### Quick Deploy to Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add `VITE_API_URL` environment variable
4. Deploy!

## 📝 License

MIT
