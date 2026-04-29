# Quick Start: Authentication System

## Project Files Created

### Backend

```
server/
├── models/User.js                    (User schema with bcrypt hashing)
├── controllers/authController.js     (Register, Login, getMe, logout)
├── routes/authRoutes.js              (Auth API endpoints)
├── middleware/
│   ├── authMiddleware.js             (JWT verification)
│   └── roleMiddleware.js             (Role-based access control)
└── utils/validation.js               (Input validation utilities)
```

### Frontend

```
client/src/
├── context/AuthContext.jsx           (Auth state & logic)
├── services/
│   ├── apiClient.js                  (Axios with interceptors)
│   └── authService.js                (Auth API integration)
├── components/ProtectedRoute.jsx     (Route protection)
├── pages/
│   ├── HomePage.jsx                  (Landing page)
│   ├── LoginPage.jsx                 (Login form)
│   ├── RegisterPage.jsx              (Register form)
│   └── DashboardPage.jsx             (Protected dashboard)
└── App.jsx                           (Updated with routing)
```

---

## Running the System

### Terminal 1: Backend

```bash
cd server

# Start dev server (with auto-reload)
npm run dev

# Output:
# ✓ Server running on http://localhost:5000 in development mode
```

### Terminal 2: Frontend

```bash
cd client

# Start dev server
npm run dev

# Output:
# ➜ Local: http://localhost:5173/
```

---

## Testing the Flow

### 1. Visit the App
Open browser: `http://localhost:5173`

### 2. Register
- Click "Get Started" or navigate to `/register`
- Fill in:
  - Name: e.g., "John Doe"
  - Email: e.g., "john@example.com"
  - Password: minimum 6 characters
  - Confirm Password
- Click "Create Account"
- User is automatically logged in and redirected to dashboard

### 3. Dashboard
- See your profile information
- Username, email, and role displayed
- Click "Logout" to sign out

### 4. Login
- Go to `/login`
- Enter email and password
- Click "Sign In"
- Redirected to dashboard

---

## API Testing (with cURL)

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Returns: { success, token, user }
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Returns: { success, token, user }
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Returns: { success, user }
```

---

## Using Auth in Your Code

### In React Components

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Protecting Routes

```javascript
// In App.jsx routes
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### Checking User Role

```javascript
const { user, hasRole } = useAuth();

if (hasRole('admin')) {
  // Show admin panel
}

if (hasAnyRole(['agent', 'admin'])) {
  // Show agent features
}
```

---

## Backend Usage

### Register/Login User (Frontend API Call)

```javascript
import authService from '../services/authService';

// Register
const response = await authService.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
});

// Login
const response = await authService.login({
  email: 'john@example.com',
  password: 'password123',
});

// Token and user stored in localStorage automatically
```

### Creating Protected Endpoints

```javascript
// routes/propertyRoutes.js
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Only authenticated users
router.get('/', authMiddleware, getProperties);

// Only agents and admins
router.post(
  '/',
  authMiddleware,
  roleMiddleware('agent', 'admin'),
  createProperty
);

// Only admins
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProperty);
```

### Using User Info in Controller

```javascript
exports.createProperty = async (req, res, next) => {
  // req.user is available (set by authMiddleware)
  const property = new Property({
    ...req.body,
    createdBy: req.user.id,
    createdByEmail: req.user.email,
  });

  await property.save();
  res.status(201).json({ success: true, data: property });
};
```

---

## Database

### MongoDB Connection
Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas - update MONGODB_URI in .env
```

### User Data Stored
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$...", // Hashed with bcrypt
  "role": "investor",
  "isVerified": false,
  "createdAt": "2026-04-29T12:00:00Z",
  "updatedAt": "2026-04-29T12:00:00Z"
}
```

---

## Environment Setup

### Backend - server/.env
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/real-estate-diaspora
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend - client/.env.local (optional)
```env
VITE_API_URL=http://localhost:5000
```

---

## Key Features

✅ **User Registration** - Create account with validation  
✅ **User Login** - Authenticate with JWT  
✅ **Protected Routes** - Frontend route protection  
✅ **Role-Based Access** - Admin, Agent, Investor roles  
✅ **Token Persistence** - localStorage persistence  
✅ **Auto-Logout** - On token expiration  
✅ **Input Validation** - Client & server-side  
✅ **Password Security** - Bcrypt hashing  
✅ **Error Handling** - Meaningful error messages  

---

## Common Tasks

### Add New Role
1. Update User model enum in `server/models/User.js`
2. Create role in registration if needed
3. Use `roleMiddleware('newRole')` to protect routes

### Create Admin User
```javascript
// In Node REPL or script
const User = require('./models/User');

await User.create({
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'securepassword123',
  role: 'admin',
});
```

### Extend User Schema
1. Edit `server/models/User.js`
2. Add fields to schema
3. Run migration or restart server
4. Update backend/frontend as needed

### Add More Routes
1. Create controller: `server/controllers/myController.js`
2. Create routes: `server/routes/myRoutes.js`
3. Add middleware: `authMiddleware` for protection
4. Register in `server.js`: `app.use('/api/mypath', myRoutes)`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Password must be at least 6 characters" | Use password with 6+ characters |
| "Email already registered" | Email is unique, use login or different email |
| "Invalid token" | Token might be expired, login again |
| "CORS error" | Check CLIENT_URL in server/.env |
| MongoDB connection error | Ensure MongoDB is running, check URI |
| Blank page on frontend | Check browser console for errors |
| Backend not receiving requests | Check VITE_API_URL in frontend |

---

## Next Steps

1. **Add Password Reset** - Email verification flow
2. **Add Refresh Tokens** - For better token management
3. **Add 2FA** - Two-factor authentication
4. **Add OAuth** - Google/GitHub login
5. **Add Rate Limiting** - Prevent brute force attacks
6. **Add Email Notifications** - Welcome, reset emails
7. **Add Profile Update** - Edit user information
8. **Add Account Deletion** - GDPR compliance

---

**Authentication system ready to use! 🔐**

For detailed API documentation, see [AUTH_DOCUMENTATION.md](./AUTH_DOCUMENTATION.md)
