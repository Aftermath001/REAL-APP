# 📋 Development Quick Reference

## Common Development Tasks

### Setup & Installation

```bash
# First-time setup
cd /home/alvin/Development/Projects/REAL-APP

# Backend setup
cd server
npm install

# Frontend setup  
cd ../client
npm install
```

### Running Development Servers

```bash
# Terminal 1 - Backend (from /server)
npm run dev
# Runs on http://localhost:5000

# Terminal 2 - Frontend (from /client)
npm run dev
# Runs on http://localhost:5173
```

### Building for Production

```bash
# Backend - No build needed, run:
npm run start

# Frontend - Build
npm run build
# Output: dist/ folder ready for deployment
```

### Database Connection

```bash
# Local MongoDB
mongod

# MongoDB Atlas (Update .env with connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/real-estate-diaspora
```

---

## 📝 Creating New Features

### Add API Endpoint

1. **Create Model** (`server/models/Property.js`):
   ```javascript
   const mongoose = require('mongoose');
   
   const propertySchema = new mongoose.Schema({
     title: String,
     price: Number,
     location: String,
     createdAt: { type: Date, default: Date.now }
   });
   
   module.exports = mongoose.model('Property', propertySchema);
   ```

2. **Create Controller** (`server/controllers/propertyController.js`):
   ```javascript
   const Property = require('../models/Property');
   
   exports.getAllProperties = async (req, res, next) => {
     try {
       const properties = await Property.find();
       res.json({ success: true, data: properties });
     } catch (error) {
       next(error);
     }
   };
   ```

3. **Create Route** (`server/routes/propertyRoutes.js`):
   ```javascript
   const express = require('express');
   const { getAllProperties } = require('../controllers/propertyController');
   const router = express.Router();
   
   router.get('/', getAllProperties);
   
   module.exports = router;
   ```

4. **Register in server.js**:
   ```javascript
   const propertyRoutes = require('./routes/propertyRoutes');
   app.use('/api/properties', propertyRoutes);
   ```

### Add Frontend Page

1. **Create Page** (`client/src/pages/PropertiesPage.jsx`):
   ```javascript
   import { useState, useEffect } from 'react';
   import axios from 'axios';
   
   export default function PropertiesPage() {
     const [properties, setProperties] = useState([]);
     
     useEffect(() => {
       axios.get('http://localhost:5000/api/properties')
         .then(res => setProperties(res.data.data))
         .catch(err => console.error(err));
     }, []);
     
     return (
       <div>
         {properties.map(prop => <div key={prop._id}>{prop.title}</div>)}
       </div>
     );
   }
   ```

2. **Add Route** (`client/src/App.jsx`):
   ```javascript
   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import PropertiesPage from './pages/PropertiesPage';
   
   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/properties" element={<PropertiesPage />} />
         </Routes>
       </BrowserRouter>
     );
   }
   ```

---

## 🔍 Testing

### Test Backend Endpoint

```bash
# Health check
curl http://localhost:5000/api/health

# Get properties
curl http://localhost:5000/api/properties

# Post with data
curl -X POST http://localhost:5000/api/properties \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Property", "price": 100000}'
```

### Using Postman/Insomnia

1. Create new request
2. Set method (GET, POST, etc.)
3. URL: `http://localhost:5000/api/...`
4. Headers: `Content-Type: application/json`
5. Body: JSON data

---

## 🎨 Styling with TailwindCSS

### Common Classes

```jsx
// Container
<div className="container-max">...</div>

// Buttons
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>

// Cards
<div className="card">...</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Grid items */}
</div>

// Colors
<div className="text-primary-600 bg-primary-50">...</div>

// Spacing
<div className="p-4 m-2 mt-8">...</div>
```

---

## 🐛 Debug Mode

### Backend Logging

```javascript
// In controllers
const logger = require('../utils/logger');

logger.info('User login attempt');
logger.error('Database connection failed', error);
logger.warn('High memory usage detected');
logger.debug('Request body:', req.body);
```

### Enable Debug Output

```bash
# Server
NODE_ENV=development npm run dev

# Frontend (Vite already shows HMR)
npm run dev
```

---

## 📦 Managing Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Install new package
npm install <package-name>

# Remove package
npm uninstall <package-name>

# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/real-estate-diaspora
JWT_SECRET=your_secret_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:5000
```

Access in frontend:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📚 File Organization

### Backend Structure
```
server/
├── config/          # Configuration files
├── controllers/     # Business logic (max 100 lines each)
├── middleware/      # Express middleware
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── utils/           # Utility functions
└── server.js        # Entry point
```

### Frontend Structure
```
client/src/
├── assets/          # Images, fonts
├── components/      # Reusable components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services
├── utils/           # Utility functions
├── App.jsx          # Main component
└── main.jsx         # Entry point
```

---

## 🚀 Deployment Checklist

### Before Deploying

- [ ] Update `JWT_SECRET` with strong random string
- [ ] Update MongoDB connection for production
- [ ] Set `NODE_ENV=production`
- [ ] Update `CLIENT_URL` to production domain
- [ ] Build frontend: `npm run build`
- [ ] Test production build locally
- [ ] Remove console.log statements
- [ ] Add proper error logging
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and alerts

### Deploy Backend

```bash
# Common platforms
# Heroku: git push heroku main
# Railway: railway up
# Vercel: vercel deploy
# AWS: eb deploy
```

### Deploy Frontend

```bash
# Vercel
npm run build && vercel deploy --prod

# Netlify
npm run build  # netlify.toml auto-deploys

# GitHub Pages
npm run build  # upload dist/ folder
```

---

## 💡 Tips & Tricks

### Speed Up npm

```bash
# Use npm ci instead of install (faster, more reliable)
npm ci

# Use npm cache
npm cache verify
```

### Hot Module Replacement (HMR)

- Frontend automatically reloads on file changes
- Backend requires restart (use nodemon)

### Better Error Messages

```bash
# Add verbose output
npm install --verbose

# Check for issues
npm audit
npm audit fix
```

### Terminal Shortcuts

```bash
# Run backend and frontend in parallel
# Terminal 1: cd server && npm run dev
# Terminal 2: cd client && npm run dev

# Or use tmux/screen for split terminals
```

---

## 🆘 Common Issues & Solutions

### Port Already in Use

```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>
```

### MongoDB Connection Refused

```bash
# Start MongoDB
mongod

# Check connection string in .env
# Reset: brew services stop mongodb-community
# Restart: brew services start mongodb-community
```

### npm Package Conflict

```bash
# Clear cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Git Merge Conflicts

```bash
# Resolve manually, then:
git add .
git commit -m "Resolve merge conflicts"
```

---

## 📞 Quick Commands Reference

```bash
# Backend
cd server && npm run dev              # Start dev
cd server && npm run start            # Start prod
cd server && npm install              # Install deps

# Frontend
cd client && npm run dev              # Start dev
cd client && npm run build            # Build prod
cd client && npm run lint             # Lint code

# Database
mongod                                # Start MongoDB
mongo                                 # MongoDB shell

# Git
git status                            # Check status
git add .                             # Stage all
git commit -m "message"               # Commit
git push origin main                  # Push
```

---

**Happy Development! 🚀**
