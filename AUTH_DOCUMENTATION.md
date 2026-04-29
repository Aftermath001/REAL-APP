# Authentication System Documentation

## Overview

A complete, production-ready authentication system built with JWT (JSON Web Tokens) for the Real Estate Diaspora Investment Platform.

## Architecture

### Backend Structure

```
server/
├── models/
│   └── User.js                 # User schema with password hashing
├── controllers/
│   └── authController.js       # Auth logic (register, login, getMe)
├── routes/
│   └── authRoutes.js           # Auth endpoints
├── middleware/
│   ├── authMiddleware.js       # JWT verification
│   └── roleMiddleware.js       # Role-based access control
├── utils/
│   └── validation.js           # Input validation
└── server.js                   # Routes registered here
```

### Frontend Structure

```
client/src/
├── context/
│   └── AuthContext.jsx         # Auth state management
├── hooks/
│   └── useAuth.js              # (via AuthContext)
├── services/
│   ├── apiClient.js            # Axios with interceptors
│   └── authService.js          # Auth API calls
├── components/
│   └── ProtectedRoute.jsx      # Route protection HOC
├── pages/
│   ├── HomePage.jsx            # Landing page
│   ├── LoginPage.jsx           # Login form
│   ├── RegisterPage.jsx        # Registration form
│   └── DashboardPage.jsx       # Protected dashboard
└── App.jsx                     # Routes setup
```

---

## Database Schema

### User Model

```javascript
{
  name: String,                 // Full name (2-50 chars)
  email: String,                // Unique email (validated)
  password: String,             // Hashed with bcrypt (salt rounds: 10)
  role: String,                 // 'investor' | 'agent' | 'admin'
  isVerified: Boolean,          // Email verification status
  createdAt: Date,              // Timestamp
  updatedAt: Date,              // Timestamp
}
```

**Indexes**: `email` (unique)

**Security**: Password field excluded from queries by default (select: false)

---

## API Endpoints

### Public Endpoints

#### 1. Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "investor",
    "isVerified": false,
    "createdAt": "2026-04-29T12:00:00Z"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Please provide a valid email address",
    "password": "Password must be at least 6 characters"
  }
}
```

#### 2. Login User
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "investor",
    "isVerified": false,
    "createdAt": "2026-04-29T12:00:00Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Protected Endpoints

All protected endpoints require JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

#### 3. Get Current User
```
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "investor",
    "isVerified": false,
    "createdAt": "2026-04-29T12:00:00Z"
  }
}
```

#### 4. Logout
```
POST /api/auth/logout
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Frontend Usage

### Using the Auth Context

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const {
    user,                  // Current user object
    isAuthenticated,       // Boolean
    isLoading,            // Loading state
    error,                // Error message
    register,             // Function
    login,                // Function
    logout,               // Function
    hasRole,              // Function
    hasAnyRole,           // Function
  } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

### Register User

```javascript
const { register } = useAuth();

const handleRegister = async () => {
  const result = await register('John Doe', 'john@example.com', 'password123');
  
  if (result.success) {
    console.log('User registered:', result.data.user);
    // User is now logged in, redirect to dashboard
  } else {
    console.error('Registration failed:', result.error);
  }
};
```

### Login User

```javascript
const { login } = useAuth();

const handleLogin = async () => {
  const result = await login('john@example.com', 'password123');
  
  if (result.success) {
    console.log('User logged in:', result.data.user);
    // Redirect to dashboard
  } else {
    console.error('Login failed:', result.error);
  }
};
```

### Logout User

```javascript
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // Redirect to login
};
```

### Protecting Routes

```javascript
import ProtectedRoute from './components/ProtectedRoute';

<Routes>
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    }
  />
</Routes>
```

### Role-Based Access

```javascript
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
  const { user, hasRole, hasAnyRole } = useAuth();

  if (!hasRole('admin')) {
    return <div>Access Denied</div>;
  }

  // Also available:
  // hasAnyRole(['admin', 'agent'])

  return <div>Admin Panel</div>;
}
```

---

## Backend Implementation Examples

### Creating a Role-Protected Endpoint

```javascript
// routes/propertyRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Only agents can create properties
router.post(
  '/',
  authMiddleware,
  roleMiddleware('agent', 'admin'),
  createProperty
);

module.exports = router;
```

### Using Auth in Controllers

```javascript
// controllers/propertyController.js
exports.createProperty = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const property = new Property({
      ...req.body,
      createdBy: req.user.id,  // User from token
      agent: req.user.id,
    });

    await property.save();

    res.status(201).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};
```

---

## Security Features

### Password Security
- ✅ Bcrypt hashing with 10 salt rounds
- ✅ Passwords never returned in API responses
- ✅ Passwords selected with `.select('+password')` only when needed

### JWT Security
- ✅ Token expiration (default: 7 days, configurable)
- ✅ Secret key from environment variables
- ✅ Token validation on protected routes
- ✅ Expired tokens return 401 status

### Input Validation
- ✅ Email format validation
- ✅ Password minimum length (6 characters)
- ✅ Name length validation (2-50 characters)
- ✅ Server-side validation (client validation as first line of defense)

### Request Security
- ✅ CORS enabled with configurable origin
- ✅ Body size limits
- ✅ Error messages don't expose sensitive info in production

### Token Storage (Frontend)
- ✅ Stored in localStorage
- ✅ Sent in Authorization header with requests
- ✅ Automatically removed on logout or token expiration
- ✅ Axios interceptors handle token injection

---

## Error Handling

### Backend Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Login successful |
| 201 | Created | User registered |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | Invalid token or credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | User not found |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Unexpected error |

### Frontend Error Handling

All errors are caught and returned to the component:

```javascript
const { login, error } = useAuth();

const result = await login('email@test.com', 'password');

if (!result.success) {
  console.error(result.error);  // Error message from backend
  // Display to user
}
```

---

## Configuration

### Environment Variables

Add to `server/.env`:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_key_change_in_production_12345
JWT_EXPIRE=7d

# Database
MONGODB_URI=mongodb://localhost:27017/real-estate-diaspora

# Server
PORT=5000
NODE_ENV=development

# CORS
CLIENT_URL=http://localhost:5173
```

Add to `client/.env.local` (optional):

```env
VITE_API_URL=http://localhost:5000
```

### Security Best Practices

1. **Production JWT Secret**: Use a strong, randomly generated string (min 32 characters)
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Token Expiration**: Set appropriate expiration time
   - Short-lived (15 min) for high-security
   - Standard (7 days) for convenience
   - Implement refresh tokens for production

3. **HTTPS**: Always use HTTPS in production

4. **CORS**: Restrict to specific origins
   ```javascript
   cors({
     origin: process.env.CLIENT_URL,
     credentials: true,
   })
   ```

5. **Rate Limiting**: Add rate limiting to auth endpoints (future implementation)

6. **Account Lockout**: Implement after N failed login attempts (future)

---

## Testing

### Manual Testing with cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get User (with token):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Create collection "Real Estate Auth"
2. Set base URL: `http://localhost:5000/api`
3. Create requests:
   - POST /auth/register
   - POST /auth/login
   - GET /auth/me (add token to Authorization header)

---

## Troubleshooting

### "Token expired" Error
- User needs to login again
- Frontend automatically clears localStorage
- Implement refresh tokens for better UX (future)

### "Invalid token" Error
- Token format incorrect
- Token corrupted during transmission
- Check Authorization header format: `Bearer <token>`

### "Email already registered" Error
- Email is unique constraint
- User should use login instead
- Implement "forgot password" flow (future)

### CORS Errors
- Check CLIENT_URL environment variable
- Ensure frontend and backend URLs match
- Verify CORS middleware is enabled

### MongoDB Connection Issues
- Check MONGODB_URI format
- Ensure MongoDB is running
- Verify network connectivity

---

## Future Enhancements

- [ ] Refresh tokens
- [ ] Password reset flow
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] OAuth (Google, GitHub login)
- [ ] Rate limiting on auth endpoints
- [ ] Account lockout after failed attempts
- [ ] Session management
- [ ] Audit logging

---

## Support

For issues or questions:
1. Check error messages and logs
2. Review environment variables
3. Verify database connection
4. Test endpoints with cURL or Postman
5. Check browser console for frontend errors

---

**Authentication system ready for production! 🔐**
