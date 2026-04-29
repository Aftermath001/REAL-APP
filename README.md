# Real Estate Diaspora Investment Platform

A production-ready full-stack web application for real estate investment opportunities for diaspora investors.

## 📋 Tech Stack

- **Frontend**: React 19 with Vite, TailwindCSS, Axios, React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing, CORS support

## 📁 Project Structure

```
REAL-APP/
├── client/                 # React Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer (axios)
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx
│   ├── index.css          # Tailwind CSS configuration
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Express.js backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware (error handling, auth)
│   ├── utils/             # Utility functions (logger, helpers)
│   ├── server.js          # Main Express app
│   └── package.json
│
├── .env.example           # Environment variables template
├── .gitignore
├── README.md
└── package.json (optional root package.json for monorepo)
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ or v20+
- **npm** v9+ or **yarn**
- **MongoDB** (local or cloud-hosted, e.g., MongoDB Atlas)

### Setup Instructions

#### 1. Clone and Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

#### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```bash
cp ../.env.example server/.env
```

Update `server/.env` with your actual values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/real-estate-diaspora
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

#### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Using MongoDB Atlas (Cloud):**
Update `MONGODB_URI` in `.env` with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate-diaspora
```

#### 4. Run Development Servers

**Backend (Terminal 1):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
# App runs on http://localhost:5173
```

## 📦 Available Scripts

### Backend

```bash
npm run dev      # Start dev server with nodemon
npm run start    # Run production server
npm test         # Run tests (configure in package.json)
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔌 API Endpoints

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-04-29T18:00:00.000Z",
  "uptime": 123.456
}
```

## 🏗️ Architecture & Best Practices

### Backend Architecture

- **Separation of Concerns**: Controllers, Models, Routes, Middleware, Utils
- **Error Handling**: Global error handler middleware with consistent error responses
- **Logging**: Centralized logger utility for consistent logging
- **Environment Config**: Dotenv for environment variables
- **Database**: Mongoose for schema validation and ODM

### Frontend Architecture

- **Component Structure**: Reusable, functional React components
- **Routing**: React Router v7 for client-side routing
- **State Management**: Ready for Redux/Context API integration
- **API Integration**: Axios service layer for clean API calls
- **Styling**: TailwindCSS for utility-first CSS
- **Performance**: Vite for fast HMR and optimized builds

### Security Features

- ✅ CORS enabled for cross-origin requests
- ✅ JWT authentication ready
- ✅ Password hashing with bcryptjs
- ✅ Environment variables for sensitive data
- ✅ Error handling without exposing stack traces in production

## 📝 Development Workflow

### Creating a New API Endpoint

1. **Create Model** in `server/models/`:
   ```javascript
   const userSchema = new mongoose.Schema({
     email: String,
     password: String,
   });
   ```

2. **Create Controller** in `server/controllers/`:
   ```javascript
   exports.getUser = async (req, res, next) => {
     // logic here
   };
   ```

3. **Create Route** in `server/routes/`:
   ```javascript
   router.get('/users/:id', getUser);
   ```

4. **Register Route** in `server.js`:
   ```javascript
   app.use('/api', userRoutes);
   ```

### Creating a New Frontend Page

1. Create component in `client/src/pages/`
2. Set up route in `App.jsx`
3. Create API service in `client/src/services/`
4. Import and use in component

## 🧪 Testing

- Add test scripts to `package.json`
- Use Jest/Vitest for unit tests
- Use React Testing Library for component tests
- Use Supertest for API endpoint tests

## 🚢 Deployment

### Backend Deployment

- Deploy to Heroku, Railway, Vercel, or AWS
- Set environment variables in platform settings
- Ensure MongoDB URI points to production database

### Frontend Deployment

- Build: `npm run build`
- Deploy to Vercel, Netlify, or GitHub Pages
- Update `CLIENT_URL` in backend for production

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Mongoose Guide](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify network access if using MongoDB Atlas

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### CORS Issues
- Check `CLIENT_URL` in backend `.env`
- Ensure frontend is running on correct port
- Verify CORS middleware in `server.js`

## 📄 Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Backend server port |
| NODE_ENV | development | Environment mode |
| MONGODB_URI | mongodb://localhost:27017/... | Database connection |
| JWT_SECRET | - | Secret key for JWT signing |
| JWT_EXPIRE | 7d | Token expiration time |
| CLIENT_URL | http://localhost:5173 | Frontend URL |

## 📖 Code Style & Conventions

- **ES6+ Syntax**: Use modern JavaScript features
- **Async/Await**: Prefer over callbacks
- **Error Handling**: Try-catch blocks with meaningful error messages
- **Comments**: Document complex logic and business rules
- **Variable Names**: Use descriptive, camelCase naming

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 💬 Support

For issues or questions:
- Create an issue on GitHub
- Check existing documentation
- Review project structure for examples

---

**Happy coding! 🎉**