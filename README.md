# Vastrika NX Frontend

A modern, responsive Vue 3 eCommerce frontend for the Vastrika NX luxury saree platform. Built with Vite, Pinia, and Tailwind CSS.

## 🚀 Features

- **Customer Shopping**: Browse sarees, filter by category/price/fabric, add to cart, checkout
- **User Accounts**: Register, login, manage addresses, order history, wishlist
- **Shopping Features**: Advanced product filtering, search, wishlist, cart management
- **Admin Dashboard**: Product management, category management, order tracking, customer management
- **State Management**: Pinia stores for global auth, cart, products, and wishlist state
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication**: Token-based authentication with localStorage persistence

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:8000`

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and update the API URL if needed:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Vastrika NX
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Header.vue      # Navigation header with search and user menu
│   ├── Footer.vue      # Footer with links and contact info
│   ├── ProductCard.vue # Product display card with add-to-cart
│   ├── HeroBanner.vue  # Homepage hero section
│   ├── Newsletter.vue  # Newsletter subscription form
│   └── admin/          # Admin-specific components
│       ├── Sidebar.vue # Admin navigation sidebar
│       └── Header.vue  # Admin header/top bar
├── pages/              # Page components
│   ├── Home.vue        # Homepage with featured products
│   ├── Shop.vue        # Product listing with filters
│   ├── ProductDetail.vue # Individual product details
│   ├── Cart.vue        # Shopping cart page
│   ├── Checkout.vue    # Checkout and order creation
│   ├── Login.vue       # User login
│   ├── Register.vue    # User registration
│   ├── UserProfile.vue # User profile management
│   ├── UserOrders.vue  # Order history
│   ├── UserAddresses.vue # Address management
│   ├── UserWishlist.vue # Wishlist view
│   └── admin/          # Admin pages
│       ├── Dashboard.vue # Admin dashboard with stats
│       ├── Products.vue  # Product management
│       ├── Categories.vue # Category management
│       ├── Orders.vue    # Order management
│       └── Customers.vue # Customer management
├── services/           # API integration services
│   ├── api.js         # Axios instance with interceptors
│   ├── authService.js # Authentication endpoints
│   ├── productService.js # Product endpoints
│   ├── cartService.js # Cart endpoints
│   ├── orderService.js # Order endpoints
│   └── [more services...]
├── stores/            # Pinia state management
│   ├── authStore.js   # Authentication state
│   ├── productStore.js # Products state
│   ├── cartStore.js   # Shopping cart state
│   └── wishlistStore.js # Wishlist state
├── layouts/           # Layout components
│   ├── MainLayout.vue # Main customer layout
│   ├── AuthLayout.vue # Auth pages layout
│   └── AdminLayout.vue # Admin dashboard layout
├── router/
│   └── index.js       # Vue Router configuration with guards
├── App.vue            # Root app component
├── main.js            # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🔌 API Integration

All API calls are handled through services in `src/services/`. Each service exports functions that use the Axios instance with automatic token injection.

### Authentication Flow

1. User submits registration/login form
2. `authService.register()` or `authService.login()` called
3. Response token stored in `authStore` and localStorage
4. Subsequent API calls include `Authorization: Bearer {token}` header
5. On page refresh, `authStore.fetchMe()` validates token

### Example: Adding to Cart

```javascript
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

// Add 2 units of product ID 5
await cartStore.addToCart(5, 2)
```

### Example: Fetching Products with Filters

```javascript
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

// Fetch with filters
await productStore.getProducts({
  category: 1,
  minPrice: 1000,
  maxPrice: 5000,
  search: 'silk'
})
```

## 🎨 Styling

The project uses **Tailwind CSS** with custom configuration:

- **Primary Color**: Maroon (`#8B0000`)
- **Accent Color**: Gold (`#FFD700`)
- **Background**: Cream (`#FFFDD0`)

Custom Tailwind classes are defined in `tailwind.config.js` for consistent button and card styling throughout the app.

## 🔐 Authentication & Authorization

- **Public Routes**: Home, Shop, Product Detail, Login, Register (no auth required)
- **User Routes**: Cart, Checkout, Profile, Orders, Addresses, Wishlist (auth required)
- **Admin Routes**: Dashboard, Products, Categories, Orders, Customers (auth + admin role required)

Route guards automatically redirect unauthorized users:
- Unauthenticated users are redirected to login
- Non-admin users trying to access admin area are redirected to home

## 📱 State Management with Pinia

### authStore
- `user`: Current user object
- `token`: Authentication token
- `isAuthenticated`: Computed boolean
- `isAdmin`: Computed boolean (checks user.role)
- `login(email, password)`: Login action
- `register(data)`: Registration action
- `logout()`: Logout action

### cartStore
- `items`: Array of cart items
- `cartTotal`: Computed total price
- `itemCount`: Computed item count
- `addToCart(productId, quantity)`: Add item action
- `removeFromCart(productId)`: Remove item action
- `updateQuantity(productId, quantity)`: Update quantity action

### productStore
- `products`: Array of products
- `pagination`: Pagination metadata
- `getProducts(filters)`: Fetch products with filters
- `getProductById(id)`: Fetch single product

### wishlistStore
- `items`: Array of wishlisted products
- `addToWishlist(productId)`: Add to wishlist
- `removeFromWishlist(productId)`: Remove from wishlist
- `getWishlist()`: Fetch user's wishlist

## 🐛 Error Handling

All API services include error handling. Failed requests return error details that can be displayed to users.

```javascript
try {
  await cartStore.addToCart(productId, quantity)
} catch (error) {
  console.error(error.response?.data?.message)
}
```

## 📦 Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (if eslint configured)
npm run lint
```

## 🔄 Integration with Backend

### Required Backend Endpoints

The frontend expects the following backend endpoints (all prefixed with `/api`):

**Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /me` - Get current user

**Products**
- `GET /products` - List products with filters
- `GET /products/:id` - Get product details

**Cart**
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `DELETE /cart/:productId` - Remove from cart

**Orders**
- `POST /orders` - Create new order
- `GET /orders` - Get user's orders

And more... See backend README for full API documentation.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure environment variables for production API URL
4. Set up redirects to `index.html` for SPA routing

### Environment Variables for Production

```
VITE_API_URL=https://api.vastrika.com/api
VITE_APP_NAME=Vastrika NX
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/awesome-feature`
2. Commit changes: `git commit -m 'Add awesome feature'`
3. Push to branch: `git push origin feature/awesome-feature`
4. Open a Pull Request

## 📞 Support

For issues, feature requests, or questions:
- Email: support@vastrika.com
- Website: https://vastrika.com

## 📄 License

This project is proprietary and confidential. All rights reserved © 2024 Vastrika.
