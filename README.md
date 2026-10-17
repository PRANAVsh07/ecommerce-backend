# 🛒 E-Commerce Backend

A scalable, production-oriented e-commerce backend built with **Node.js, Express.js, MongoDB, and Redis**. This project focuses on REST API development, authentication, caching, rate limiting, and reliable backend architecture.

I'm building this project incrementally to understand how real-world backend systems work beyond basic CRUD operations.

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Short-lived access tokens (15 minutes)
* Refresh tokens (7 days)
* Refresh token validation against stored database records
* Role-based authorization
* Protected routes using authentication middleware

### ⚡ Performance & Caching

* Redis-based caching
* Cache-aside pattern
* Cache HIT and MISS handling
* TTL-based cache expiration
* Version-based cache invalidation
* MongoDB fallback when Redis is unavailable

### 🛡️ API Protection

* Redis-based rate limiting
* Login request throttling
* HTTP `429 Too Many Requests` responses
* `Retry-After` response header
* Centralized error handling

### 🗄️ Database

* MongoDB integration using Mongoose
* User data persistence
* Schema-based data modeling
* Passwords stored as bcrypt hashes

## 🧰 Tech Stack

| Technology           | Purpose                         |
| -------------------- | ------------------------------- |
| Node.js              | JavaScript runtime              |
| Express.js           | REST API framework              |
| MongoDB              | Primary database                |
| Mongoose             | MongoDB object modeling         |
| Redis                | Caching and rate limiting       |
| JSON Web Token (JWT) | Authentication                  |
| bcrypt               | Password hashing                |
| dotenv               | Environment variable management |
| Postman              | API testing                     |

## 🏗️ Architecture

The project follows a modular backend architecture that separates responsibilities.

```text
src/
├── config/          # Database and application configuration
├── controllers/     # HTTP request and response handling
├── middleware/      # Authentication, authorization and errors
├── models/          # Mongoose schemas
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Shared utility functions
└── validators/      # Request validation
```

*The directory structure above is illustrative. Adjust it to match the actual files in your repository.*

### Request Flow

```text
Client
  │
  ▼
Express Router
  │
  ▼
Middleware
  │
  ▼
Controller
  │
  ▼
Service Layer
  │
  ▼
MongoDB / Redis
  │
  ▼
JSON Response
```

## 🔑 Authentication Flow

### Login

1. The user submits their email and password.
2. The backend validates the credentials.
3. bcrypt verifies the password.
4. The server generates an access token and a refresh token.
5. The refresh token is stored in the user's MongoDB document.
6. Both tokens are returned to the client.

### Refresh Access Token

1. The client submits its refresh token.
2. The backend verifies the token using the refresh-token secret.
3. The backend checks that the token matches the value stored in MongoDB.
4. A new access token is generated.

### Protected Requests

Send the access token in the authorization header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Token lifetimes**

* Access token: 15 minutes
* Refresh token: 7 days

These are the current configured lifetimes and may change as the project evolves.

## ⚡ Redis Caching

The project uses the cache-aside pattern to reduce unnecessary database reads.

```text
Client Request
      │
      ▼
  Check Redis
      │
      ├── Cache HIT ──► Return cached data
      │
      └── Cache MISS
                │
                ▼
           Query MongoDB
                │
                ▼
           Update Redis
                │
                ▼
           Return response
```

The implementation includes TTL-based expiration and version-based cache invalidation to help manage stale data.

## 🛡️ Rate Limiting

Redis is used to track requests and restrict excessive login attempts.

The current configured policy is:

* Maximum: 5 requests per 60-second window
* Excess requests: HTTP `429 Too Many Requests`
* Retry guidance: `Retry-After` header

This helps protect the API from excessive requests and brute-force login attempts.

## ⚙️ Getting Started

### Prerequisites

Install the following:

* Node.js
* MongoDB or MongoDB Atlas
* Redis or a Redis-compatible service
* Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ecommerce-backend
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
REDIS_URL=your_redis_connection_url
```

Use the actual environment variable names expected by your code. If your Redis or database configuration uses separate variables, configure those accordingly.

**Security notes:**

* Never commit `.env` to GitHub.
* Use strong, unique secrets for access and refresh tokens.
* Never publish database credentials or Redis connection strings.

### 4. Start the Server

Run the development command configured in your `package.json`. If it is `dev`, use:

```bash
npm run dev
```

Otherwise, use your configured command, such as:

```bash
node server.js
```

The server should start and connect to the configured services.

## 🧪 API Testing

Use Postman to test your endpoints.

| Operation            | Method | Example endpoint     |
| -------------------- | ------ | -------------------- |
| Register             | POST   | `/api/auth/register` |
| Login                | POST   | `/api/auth/login`    |
| Refresh access token | POST   | `/api/auth/refresh`  |

These paths assume your router is mounted at `/api/auth`. Adjust them to match your application.

## 🎯 Project Goals

The goal is to build a backend that demonstrates more than basic CRUD operations:

* Modular and maintainable architecture
* Secure authentication practices
* Efficient database access
* API protection and rate limiting
* Reliable handling of external dependencies
* Practical understanding of production backend development

## 👨‍💻 Author

**Pranav Sharma**


⭐ If you find this project useful, feel free to explore the code and follow its development.
