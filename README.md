# 📸 Focal — Social Media Platform

<div align="center">

![Focal Banner](https://img.shields.io/badge/Focal-Social%20Media%20Platform-E1306C?style=for-the-badge&logo=instagram&logoColor=white)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?style=flat-square&logo=socket.io)](https://socket.io/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Cloud-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Focal** is a full-stack Instagram-inspired social media platform built with the MERN stack. Share photos, connect with friends, explore stories, send real-time messages, and engage with a vibrant community — all in one beautifully crafted app.

[🌐 Live Demo](#) 

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Getting Started](#-getting-started)
  - [Clone the Repository](#1-clone-the-repository)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
  - [Environment Variables](#4-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🔌 API Documentation](#api-documentation)
  - [Auth Routes](#auth-routes)
  - [User Routes](#user-routes)
  - [Post Routes](#post-routes)
  - [Comment Routes](#comment-routes)
  - [Story Routes](#story-routes)
  - [Message Routes](#message-routes)
  - [Notification Routes](#notification-routes)
- [🗄️ Database Schema](#️-database-schema)
- [🔒 Authentication & Security](#-authentication--security)
- [☁️ Media Upload (Cloudinary + Multer)](#️-media-upload-cloudinary--multer)
- [⚡ Real-Time Features (Socket.IO)](#-real-time-features-socketio)
- [🧠 State Management (Redux Toolkit)](#-state-management-redux-toolkit)
- [🎨 UI & Theming](#-ui--theming)
- [📦 Dependencies](#-dependencies)
- [🤝 Contributing](#-contributing)
- [🛡️ License](#️-license)
- [👤 Author](#-author)

---

## ✨ Features

### 👤 Authentication & User Management
- ✅ Secure user registration and login with **JWT** + **bcrypt** password hashing
- ✅ Persistent sessions via HTTP-only cookies / localStorage token management
- ✅ Profile setup with avatar, bio, website, and gender fields
- ✅ Edit profile information and change profile picture
- ✅ Public & private account toggle
- ✅ Follow / Unfollow users
- ✅ Followers & Following lists with user search

### 📷 Posts
- ✅ Create posts with single or multiple image/video uploads
- ✅ Add captions with hashtag and mention support
- ✅ Like / Unlike posts
- ✅ Save / Unsave posts to a personal collection
- ✅ Delete your own posts
- ✅ Explore page with trending posts
- ✅ Infinite scroll feed
- ✅ Post detail modal view

### 💬 Comments
- ✅ Add, edit, and delete comments on posts
- ✅ Like comments
- ✅ Nested replies to comments
- ✅ Mention users in comments

### 📖 Stories
- ✅ Upload 24-hour ephemeral photo/video stories
- ✅ Story viewer with progress bar and auto-advance
- ✅ Story reactions and replies
- ✅ View tracking (who viewed your story)
- ✅ Auto-delete after 24 hours

### 💌 Real-Time Direct Messaging
- ✅ One-on-one private messaging via **Socket.IO**
- ✅ Real-time message delivery and read receipts
- ✅ Share posts in messages
- ✅ Typing indicators
- ✅ Online/offline presence indicators
- ✅ Message notifications

### 🔔 Notifications
- ✅ Real-time push notifications for likes, comments, follows, and mentions
- ✅ Notification history with read/unread states
- ✅ Mark all as read

### 🔍 Search & Explore
- ✅ Search users and hashtags in real-time
- ✅ Explore page with curated content grid
- ✅ Trending hashtags

### 🎨 UI/UX
- ✅ Fully responsive — mobile, tablet, and desktop
- ✅ Dark mode / Light mode toggle
- ✅ Smooth animations and transitions
- ✅ Instagram-inspired clean design with Tailwind CSS
- ✅ Toast notifications for user feedback
- ✅ Loading skeletons for improved UX

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 (with Vite) |
| **Styling** | Tailwind CSS 3, custom CSS |
| **State Management** | Redux Toolkit + RTK Query |
| **Routing** | React Router DOM v6 |
| **Real-time** | Socket.IO Client |
| **HTTP Client** | Axios |
| **Backend Runtime** | Node.js 18 |
| **Backend Framework** | Express.js 4 |
| **Database** | MongoDB Atlas (via Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **File Uploads** | Multer (local buffer) + Cloudinary (cloud storage) |
| **Real-time Server** | Socket.IO 4 |
| **Language** | JavaScript (ES6+), HTML5, CSS3 |

---

## 📁 Project Structure

```
focal/
├── 📂 Backend/                               # Node.js / Express Backend
│   ├── 📂 node_modules/
│   ├── 📂 public/
│   │   └── 📂 temp/
│   │       └── .gitkeep                      # Temp folder for multer uploads
│   ├── 📂 src/
│   │   ├── 📂 DataBase/
│   │   │   └── connection.db.js              # MongoDB Atlas connection setup
│   │   ├── 📂 middleware/
│   │   │   ├── multer.middleware.js          # Multer config (memoryStorage)
│   │   │   └── requirelogin.js              # JWT auth guard middleware
│   │   ├── 📂 module/                        # Mongoose models
│   │   │   ├── notification.model.js
│   │   │   ├── post.model.js
│   │   │   ├── story.model.js
│   │   │   └── user.model.js
│   │   ├── 📂 routes/
│   │   │   ├── auth.route.js                # Register / Login / Logout
│   │   │   ├── post.route.js                # CRUD posts, likes, saves
│   │   │   ├── privacy.route.js             # Account privacy settings
│   │   │   ├── story.route.js               # Story upload & view
│   │   │   └── user.route.js                # Profile, follow, search
│   │   └── 📂 utils/
│   │       ├── ApiError.js                  # Custom error class
│   │       ├── ApiResponse.js               # Standardized API response
│   │       ├── asyncHandler.js              # Async try/catch wrapper
│   │       ├── cloudinary.js                # Cloudinary upload helper
│   │       └── password.js                  # bcrypt hash & compare
│   ├── .env                                  # Environment variables
│   ├── .gitignore
│   ├── .prettierignore
│   ├── .prettierrc
│   ├── app.js                               # Express app & middleware setup
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js                            # HTTP server entry point
│   └── socket.js                            # Socket.IO server events
│
├── 📂 Frontend/                              # React + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 assets/                        # Static images, SVGs, icons
│   │   ├── 📂 components/                    # Reusable UI components
│   │   │   ├── AuthLayout.jsx               # Wrapper for auth pages
│   │   │   ├── CreatePostModel.jsx          # Create post modal
│   │   │   ├── FeedPost.jsx                 # Individual feed post card
│   │   │   ├── FollowFollwersModel.jsx      # Followers/Following modal
│   │   │   ├── HomePageLayout.jsx           # Home page layout wrapper
│   │   │   ├── NavLink.jsx                  # Sidebar navigation link item
│   │   │   ├── NotFound.jsx                 # 404 component
│   │   │   ├── PostFullScreenModal.jsx      # Full-screen post detail modal
│   │   │   ├── RequireAuth.jsx              # Protected route wrapper
│   │   │   ├── RightSidebar.jsx             # Suggested users sidebar
│   │   │   ├── Sidebar.jsx                  # Main left navigation sidebar
│   │   │   ├── Stories.jsx                  # Stories row on home feed
│   │   │   ├── StoryRing.jsx                # Circular story avatar ring
│   │   │   ├── StoryViewers.jsx             # Story viewers list
│   │   │   └── UserPostGrid.jsx             # Profile page post grid
│   │   ├── 📂 data/
│   │   │   └── mockData.js                  # Static mock data for dev/testing
│   │   ├── 📂 Pages/                         # Route-level page components
│   │   │   ├── About.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Expore.jsx                   # Explore / Discover page
│   │   │   ├── Feed.jsx                     # Main home feed
│   │   │   ├── Help.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Message.jsx                  # Direct messages page
│   │   │   ├── Notification.jsx
│   │   │   ├── PrivacySetting.jsx
│   │   │   ├── Profile.jsx                  # Current user profile
│   │   │   ├── Reels.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Userprofile.jsx              # Other user's public profile
│   │   ├── 📂 redux/                         # Redux Toolkit state management
│   │   │   ├── 📂 slices/                    # Feature slices (auth, post, etc.)
│   │   │   └── store.js                     # Redux store configuration
│   │   ├── 📂 utils/
│   │   │   ├── api.jsx                      # Axios instance & API helpers
│   │   │   ├── Authheader.jsx               # Auth header utility
│   │   │   └── socket.js                    # Socket.IO client setup
│   │   ├── App.css
│   │   ├── App.jsx                          # Root component & routes
│   │   ├── index.css
│   │   └── main.jsx                         # React DOM entry point
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md                                 # ← You are here
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18.x or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.x or higher | Bundled with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **MongoDB Atlas Account** | — | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Cloudinary Account** | — | [cloudinary.com](https://cloudinary.com/) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/focal.git
cd focal
```

### 2. Backend Setup

```bash
# Navigate to the Backend directory
cd Backend

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# → Fill in your values (see Environment Variables section below)

# Start the development server with nodemon
npm run dev
```

The backend server will start on **http://localhost:5000**

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Start the React + Vite development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 4. Environment Variables

#### Server (`Backend/.env`)

```env
# ─── Server ───────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ─── MongoDB Atlas ────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/focal?retryWrites=true&w=majority

# ─── JWT ──────────────────────────────────────────────────
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# ─── Cloudinary ───────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ─── Client ───────────────────────────────────────────────
CLIENT_URL=http://localhost:5173
```

#### Client (`Frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files to version control.** They are included in `.gitignore` by default.

---

## 📜 Available Scripts

### Backend (`/server`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start server with nodemon (hot reload) |
| `npm start` | Start server in production mode |
| `npm test` | Run test suite |

### Frontend (`/client`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🔌 API Documentation

> **Base URL:** `http://localhost:5000/api`  
> **Protected routes** require an `Authorization: Bearer <token>` header (verified by `requirelogin.js` middleware).

---

### Auth Routes
**File:** `Backend/src/routes/auth.route.js`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT token | ❌ |
| `POST` | `/auth/logout` | Logout and invalidate session | ✅ |
| `GET` | `/auth/me` | Get current authenticated user | ✅ |

**Example — Register**
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Response**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc...",
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "avatar": "https://res.cloudinary.com/...",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### User Routes
**File:** `Backend/src/routes/user.route.js`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/users/:username` | Get user profile by username | ✅ |
| `PUT` | `/users/profile` | Update current user profile | ✅ |
| `PUT` | `/users/avatar` | Update profile picture (multipart) | ✅ |
| `POST` | `/users/:id/follow` | Follow / Unfollow a user (toggle) | ✅ |
| `GET` | `/users/:id/followers` | Get user's followers list | ✅ |
| `GET` | `/users/:id/following` | Get user's following list | ✅ |
| `GET` | `/users/search?q=query` | Search users by name or username | ✅ |
| `GET` | `/users/:id/saved` | Get current user's saved posts | ✅ |

---

### Post Routes
**File:** `Backend/src/routes/post.route.js`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/posts/feed` | Get paginated home feed posts | ✅ |
| `POST` | `/posts` | Create a new post (multipart) | ✅ |
| `GET` | `/posts/:id` | Get single post by ID | ✅ |
| `DELETE` | `/posts/:id` | Delete your own post | ✅ |
| `POST` | `/posts/:id/like` | Like / Unlike a post (toggle) | ✅ |
| `POST` | `/posts/:id/save` | Save / Unsave a post (toggle) | ✅ |
| `GET` | `/posts/user/:userId` | Get all posts by a specific user | ✅ |
| `POST` | `/posts/:id/comment` | Add a comment to a post | ✅ |
| `DELETE` | `/posts/:id/comment/:commentId` | Delete a comment | ✅ |

**Example — Create Post**
```
POST /api/posts
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
  caption: "Golden hour 🌅 #photography #nature"
  images: [file1.jpg, file2.jpg]
```

---

### Story Routes
**File:** `Backend/src/routes/story.route.js`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/stories/feed` | Get stories of followed users | ✅ |
| `POST` | `/stories` | Upload a new story (multipart) | ✅ |
| `DELETE` | `/stories/:id` | Delete your own story | ✅ |
| `POST` | `/stories/:id/view` | Mark a story as viewed | ✅ |
| `GET` | `/stories/:id/viewers` | Get list of viewers for your story | ✅ |

---

### Privacy Routes
**File:** `Backend/src/routes/privacy.route.js`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/privacy` | Get current privacy settings | ✅ |
| `PUT` | `/privacy/account` | Toggle public / private account | ✅ |
| `PUT` | `/privacy/activity` | Update activity status visibility | ✅ |

---

### Notification Routes
**File:** Uses `notification.model.js` — triggered by Socket.IO events

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/notifications` | Get all notifications for user | ✅ |
| `PUT` | `/notifications/:id/read` | Mark a notification as read | ✅ |
| `PUT` | `/notifications/read-all` | Mark all notifications as read | ✅ |
| `DELETE` | `/notifications/:id` | Delete a notification | ✅ |

---

## 🗄️ Database Schema

> Models live in `Backend/src/module/`

### User Model — `user.model.js`
```javascript
{
  username:       { type: String, unique: true, required: true },
  email:          { type: String, unique: true, required: true },
  password:       { type: String, required: true },             // bcrypt hashed via password.js
  fullName:       { type: String, required: true },
  avatar:         { type: String, default: '' },                // Cloudinary URL
  bio:            { type: String, maxlength: 150 },
  website:        { type: String },
  gender:         { type: String, enum: ['male', 'female', 'prefer_not_to_say'] },
  isPrivate:      { type: Boolean, default: false },
  followers:      [{ type: ObjectId, ref: 'User' }],
  following:      [{ type: ObjectId, ref: 'User' }],
  savedPosts:     [{ type: ObjectId, ref: 'Post' }],
  timestamps:     true
}
```

### Post Model — `post.model.js`
```javascript
{
  author:         { type: ObjectId, ref: 'User', required: true },
  images:         [{ url: String, publicId: String }],          // Cloudinary URLs
  caption:        { type: String, maxlength: 2200 },
  hashtags:       [String],
  mentions:       [{ type: ObjectId, ref: 'User' }],
  likes:          [{ type: ObjectId, ref: 'User' }],
  comments:       [{
    user:           { type: ObjectId, ref: 'User' },
    text:           String,
    createdAt:      Date
  }],
  location:       { type: String },
  timestamps:     true
}
```

### Story Model — `story.model.js`
```javascript
{
  author:         { type: ObjectId, ref: 'User', required: true },
  media:          {
    url:            String,                                      // Cloudinary URL
    publicId:       String,
    type:           { type: String, enum: ['image', 'video'] }
  },
  viewers:        [{ user: ObjectId, viewedAt: Date }],
  expiresAt:      { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 },
  timestamps:     true
}
```

### Notification Model — `notification.model.js`
```javascript
{
  recipient:      { type: ObjectId, ref: 'User', required: true },
  sender:         { type: ObjectId, ref: 'User', required: true },
  type:           { type: String, enum: ['like', 'comment', 'follow', 'mention'] },
  post:           { type: ObjectId, ref: 'Post' },
  isRead:         { type: Boolean, default: false },
  timestamps:     true
}
```

---

## 🔒 Authentication & Security

Focal uses a **JWT-based stateless authentication** flow powered by `requirelogin.js` and `password.js`:

1. User registers → password is hashed with **bcryptjs** (`cost factor: 12`) via `Backend/src/utils/password.js`
2. Server signs a **JWT** with the user's `_id` and an expiry
3. Client stores the token and sends it via `Authheader.jsx` utility on every request
4. `Backend/src/middleware/requirelogin.js` verifies the token and attaches `req.user` on every protected route
5. Standardized responses use `ApiResponse.js` and errors use `ApiError.js` for consistent API output
6. All async route handlers are wrapped with `asyncHandler.js` to eliminate try/catch boilerplate

**Security measures implemented:**
- Passwords hashed with `bcryptjs` (salt rounds: 12)
- JWT expiry configurable via `JWT_EXPIRES_IN` env variable
- Input validation and sanitization on all routes
- CORS configured to allow only the `CLIENT_URL` origin
- Multer file type and size validation before Cloudinary upload
- `.env` excluded from version control via `.gitignore`

---

## ☁️ Media Upload (Cloudinary + Multer)

Focal uses a two-step upload pipeline configured in `multer.middleware.js` and `cloudinary.js`:

```
Client (file)  →  multer.middleware.js (diskStorage → public/temp/)  →  cloudinary.js  →  URL saved to MongoDB
```

**Multer** is configured with `diskStorage` saving files temporarily to `Backend/public/temp/` (the `.gitkeep` preserves this folder in git). After a successful Cloudinary upload, the temp file is deleted automatically.

```javascript
// multer.middleware.js (simplified)
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public/temp'),
  filename:    (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },          // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
    cb(null, allowed.includes(file.mimetype));
  }
});
```

**Cloudinary folders:**
| Content | Folder |
|---------|--------|
| Post images | `focal/posts` |
| Profile avatars | `focal/avatars` |
| Stories | `focal/stories` |

---

## ⚡ Real-Time Features (Socket.IO)

Focal uses **Socket.IO** for bi-directional real-time communication between clients and the server.

### Socket Events

#### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join` | `{ userId }` | Register user to their personal room |
| `sendMessage` | `{ conversationId, message }` | Send a direct message |
| `typing` | `{ conversationId, isTyping }` | Broadcast typing indicator |
| `markRead` | `{ conversationId }` | Mark messages as read |

#### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `newMessage` | `{ message }` | Deliver a new chat message |
| `notification` | `{ notification }` | Push a new notification |
| `userOnline` | `{ userId }` | Notify user came online |
| `userOffline` | `{ userId }` | Notify user went offline |
| `typing` | `{ userId, isTyping }` | Relay typing indicator |
| `messageRead` | `{ conversationId }` | Relay read receipt |

### Socket Architecture

```
Client A ─── socket.emit('sendMessage') ───► Server
                                                │
                                    socket.to(recipientRoom)
                                                │
                                                ▼
                                           Client B ← socket.on('newMessage')
```

---

## 🧠 State Management (Redux Toolkit)

The client uses **Redux Toolkit** for global state management. The store is configured in `Frontend/src/redux/store.js` with feature slices in `Frontend/src/redux/slices/`.

| Slice | State Managed |
|-------|--------------|
| `authSlice` | Current user, JWT token, login/logout state |
| `postSlice` | Feed posts, explore posts, post detail cache |
| `userSlice` | Visited profiles, search results, follow state |
| `storySlice` | Story feed, viewed stories |
| `notificationSlice` | Notifications list and unread count |
| `uiSlice` | Modal open/close, sidebar state, dark mode |

**Frontend Utils:**
- `Frontend/src/utils/api.jsx` — Axios instance pre-configured with `baseURL` from `.env` and auth header injection
- `Frontend/src/utils/Authheader.jsx` — Returns `{ Authorization: Bearer <token> }` header for API calls
- `Frontend/src/utils/socket.js` — Initializes and exports the Socket.IO client singleton

---

## 🎨 UI & Theming

- Built entirely with **Tailwind CSS 3** utility classes
- Custom theme colors extending Tailwind's default palette:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        focal: {
          pink:    '#E1306C',
          purple:  '#833AB4',
          orange:  '#F77737',
          yellow:  '#FCAF45',
          blue:    '#405DE6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

- Dark mode supported via `.dark` class on `<html>` element
- Smooth page transitions with CSS animations
- Responsive breakpoints: `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)`

---

## 📦 Dependencies

### Backend (`/server`)

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18 | Web framework |
| `mongoose` | ^7.x | MongoDB ODM |
| `jsonwebtoken` | ^9.x | JWT auth |
| `bcryptjs` | ^2.x | Password hashing |
| `multer` | ^1.x | File upload middleware |
| `cloudinary` | ^2.x | Cloud media storage |
| `socket.io` | ^4.x | Real-time communication |
| `cors` | ^2.x | Cross-Origin Resource Sharing |
| `helmet` | ^7.x | HTTP security headers |
| `express-rate-limit` | ^6.x | Rate limiting |
| `dotenv` | ^16.x | Environment variables |
| `nodemon` | ^3.x | Dev auto-restart |

### Frontend (`/client`)

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.x | UI library |
| `react-dom` | ^18.x | DOM rendering |
| `react-router-dom` | ^6.x | Client-side routing |
| `@reduxjs/toolkit` | ^2.x | State management |
| `react-redux` | ^9.x | React-Redux bindings |
| `axios` | ^1.x | HTTP client |
| `socket.io-client` | ^4.x | Real-time client |
| `tailwindcss` | ^3.x | CSS framework |
| `vite` | ^5.x | Frontend build tool |
| `react-hot-toast` | ^2.x | Toast notifications |
| `react-icons` | ^5.x | Icon library |
| `date-fns` | ^3.x | Date formatting |
| `swiper` | ^11.x | Story / image carousel |

---

## 🤝 Contributing

Contributions are welcome and greatly appreciated! Here's how to get involved:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes with a descriptive message
   ```bash
   git commit -m "feat: add story reactions feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request against `main`


## 👤 Author

<div align="center">

*Dhruv Sharma*


[![LinkedIn(https://www.linkedin.com/in/dhruv-sharma-25822228a/
[![Portfolio]https://dhruv-sharma-portfolio-neon.vercel.app/

</div>

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

Made with ❤️ and ☕ by [Dhruv Sharma][![GitHub](https://img.shields.io/badge/GitHub-@DhruvSharma49-181717?style=flat-square&logo=github)](https://github.com/DhruvSharma49)

</div>
