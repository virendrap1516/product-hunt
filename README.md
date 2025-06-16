# Product Hunt 🚀

A full-stack Product Hunt clone built with **Nuxt 3**, **Express.js**, and **MongoDB**. This project allows users to discover, submit, and interact with innovative products in a modern, responsive interface.






## ✨ Features

### 🔐 Authentication System

- [x] **JWT-based Authentication** with secure HTTP-only cookies
- [x] **User Registration** with avatar upload and email validation
- [x] **User Login/Logout** with persistent sessions
- [x] **Profile Management** with bio and avatar updates
- [x] **Protected Routes** with middleware authentication
- [x] **Password Security** with bcrypt hashing

### 📦 Product Management

- [x] **Product Submission** with comprehensive form validation
- [x] **Multi-file Upload** support (logo + product images)
- [x] **Product Categories** (AI, SaaS, Devtools, Productivity, etc.)
- [x] **Product Details Page** with full information display
- [x] **Image Management** with Cloudinary integration
- [x] **Product CRUD Operations** (Create, Read, Update, Delete)

### 🏠 Home/Explore Page

- [x] **Product Listing** with responsive grid layout
- [x] **Category Filtering** with dynamic category counts
- [x] **Search Functionality** across name, tagline, and description
- [x] **Sorting Options** (Latest, Most Upvoted, Alphabetical)
- [x] **Featured Products** highlighting system
- [x] **Real-time Filtering** with client-side optimization

### ⬆️ Upvoting System

- [x] **Toggle Upvote/Unvote** functionality
- [x] **Real-time Vote Counting** with optimistic updates
- [x] **One Vote Per User** enforcement
- [x] **User-specific Vote Status** tracking
- [x] **Duplicate Prevention** with database constraints

### 💬 Commenting System

- [x] **Hierarchical Comments** with nested replies
- [x] **Comment Creation** for authenticated users
- [x] **Real-time Comment Display** with author information
- [x] **Comment Validation** (1-500 characters)
- [x] **Threaded Conversations** with parent-child relationships

### 👤 User Profiles

- [x] **User Profile Pages** with submitted products
- [x] **User Statistics** (total products, join date)
- [x] **Upvoted Products** tracking and display
- [x] **Profile Customization** with bio and avatar

## 🛠 Tech Stack

### Frontend

- **Framework:** Nuxt 3 with Vue 3 Composition API
- **Styling:** Tailwind CSS + Vue Shadcn UI Components
- **State Management:** Vue Composables (useAuth, useProducts, etc.)
- **HTTP Client:** Nuxt $fetch with automatic error handling
- **Icons:** Lucide Vue Next
- **Image Handling:** Nuxt Image with optimization

### Backend

- **Runtime:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens with HTTP-only cookies
- **File Upload:** Multer + Cloudinary integration
- **Validation:** Custom middleware with comprehensive rules
- **Security:** CORS, bcrypt, input sanitization

### DevOps & Tools

- **Development:** Hot reload, ESLint, TypeScript support
- **Deployment:** Ready for Vercel, Render, or Fly.io
- **Version Control:** Git with clean commit history
- **API Testing:** Comprehensive API documentation

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or MongoDB Atlas) - [Setup Guide](https://docs.mongodb.com/manual/installation/)
- **Cloudinary Account** (for image uploads) - [Sign up](https://cloudinary.com/)
- **Git** - [Download](https://git-scm.com/)

### 🚀 Quick Start

```bash
# 1. Clone the repository
git clone [your-repo-url]
cd kulp-project

# 2. Setup backend
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and Cloudinary credentials
npm run dev

# 3. Setup frontend (in new terminal)
cd ../client
npm install
npm run dev
```

### 📚 Detailed Setup

### 1. Clone the Repository

```bash
git clone [your-repo-url]
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables in .env:
# MONGODB_URL=mongodb://localhost:27017/producthunt
# JWT_SECRET=your-super-secret-jwt-key-change-this
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
# FRONTEND_URL=http://localhost:3000

# Start development server
npm run dev
```

**Server will be running on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory (in new terminal)
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will be running on:** `http://localhost:3000`

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Documentation:** See server/README.md

## 🔧 Environment Variables

### Server (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/producthunt
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Client

No additional environment variables required for development.

## 📚 API Documentation

The backend provides a comprehensive REST API. See [server/README.md](./server/README.md) for detailed documentation including:

- Authentication endpoints
- Product management
- Comment system
- User operations
- Request/response examples
- Error handling

### Key API Endpoints

```
Authentication:
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/me          # Get current user

Products:
GET  /api/products         # Get all products (with filtering)
POST /api/products         # Create new product
GET  /api/products/:id     # Get single product
POST /api/products/:id/upvote # Toggle upvote

Comments:
GET  /api/comments/product/:id # Get product comments
POST /api/comments             # Create comment/reply
```

## 🌐 Deployment

### 🌟 Quick Deployment Options

**Frontend (Vercel):**

```bash
# Connect your GitHub repo to Vercel
# Build command: npm run build
# Output directory: .output/public
# Install command: npm install
```


#### Option 2: Full-Stack on Railway

```bash
# Connect GitHub repository
# Railway will auto-detect and deploy both services
# Set environment variables in Railway dashboard
```

### 🔧 Environment Variables for Production

**Backend (.env for production):**

```env
NODE_ENV=production
PORT=5000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/producthunt-prod
JWT_SECRET=your-super-secure-64-character-production-jwt-secret
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.vercel.app
CLOUDINARY_CLOUD_NAME=your-production-cloud-name
CLOUDINARY_API_KEY=your-production-api-key
CLOUDINARY_API_SECRET=your-production-api-secret
```

**Frontend (Nuxt.config.ts):**

```typescript
// Update API base URL for production
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NODE_ENV === "production"
          ? "https://your-backend-domain.render.com/api"
          : "http://localhost:5000/api",
    },
  },
});
```

### 📋 Deployment Checklist

- [ ] **Database:** MongoDB Atlas cluster configured
- [ ] **Security:** Strong JWT secret (64+ characters)
- [ ] **Environment:** All production environment variables set
- [ ] **CORS:** Frontend URL properly configured in backend
- [ ] **Images:** Cloudinary production account setup
- [ ] **Domain:** Custom domain configured (optional)
- [ ] **SSL:** HTTPS enabled on both frontend and backend


### 🗄️ Database Setup (MongoDB Atlas)

1. **Create Atlas Account:** [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Create Cluster:** Choose free tier (M0)
3. **Configure Access:**
   - Add database user with password
   - Whitelist IP addresses (0.0.0.0/0 for all)
4. **Get Connection String:** Replace in MONGODB_URL
5. **Test Connection:** Ensure your app can connect

## 🧪 Testing

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🔧 Troubleshooting

### Common Issues

**Issue: "Cannot connect to MongoDB"**

```bash
# Solution: Check your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/producthunt
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/dbname
```

**Issue: "Cloudinary upload failed"**

```bash
# Solution: Verify Cloudinary credentials in .env
# Make sure all three values are correct:
# CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
```

**Issue: "CORS error in browser"**

```bash
# Solution: Check FRONTEND_URL in backend .env matches your frontend URL
# Development: http://localhost:3000
# Production: https://your-domain.com
```

**Issue: "JWT token not working"**

```bash
# Solution: Ensure JWT_SECRET is at least 32 characters long
# Clear browser cookies and try logging in again
```

### Development Tips

- Use **MongoDB Compass** for database management
- Use **Postman** or **Thunder Client** for API testing
- Check browser **Network tab** for API request debugging
- Monitor **console logs** in both frontend and backend
- Use **Vue DevTools** for frontend state debugging

## 📈 Performance Optimizations

- **Client-side filtering** for better UX
- **Image optimization** with Cloudinary
- **Lazy loading** for product images
- **Optimistic updates** for real-time feel
- **Database indexing** for fast queries
- **Caching strategies** for API responses

## 🔒 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password hashing** with bcrypt
- **Input validation** and sanitization
- **CORS configuration** for cross-origin requests
- **File upload restrictions** (type, size limits)
- **Rate limiting** on API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**✅ Users Can:**

- Register, login, and manage their profiles with secure authentication
- Create and submit products with multiple images and detailed information
- Browse, search, and filter products with advanced discovery features
- Upvote products and track their favorites
- Engage in hierarchical comment discussions with nested replies
- View comprehensive user profiles and product statistics






<<<<<<< HEAD
**Current Status**: All admin backend functionality is implemented and documented. The admin frontend interface needs to be built to complete this feature.


**Built with ❤️ using modern web technologies**
=======

---

>>>>>>> 44a1e64cc46753490b16ed432bffa4ed63751fab
