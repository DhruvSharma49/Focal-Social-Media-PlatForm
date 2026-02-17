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

[🌐 Live Demo](#) · [📖 API Docs](#api-documentation) · [🐛 Report Bug](issues/) · [✨ Request Feature](issues/)

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
├── 📂 client/                          # React Frontend
│   ├── 📂 public/
│   │   └── focal-logo.svg
│   ├── 📂 src/
│   │   ├── 📂 api/                     # Axios instances & API calls
│   │   │   ├── axiosInstance.js
│   │   │   ├── authApi.js
│   │   │   ├── postApi.js
│   │   │   ├── userApi.js
│   │   │   └── messageApi.js
│   │   ├── 📂 assets/                  # Static images, icons
│   │   ├── 📂 components/              # Reusable UI components
│   │   │   ├── 📂 auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── RegisterForm.jsx
│   │   │   ├── 📂 common/
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── 📂 layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── MobileNav.jsx
│   │   │   │   └── RightSidebar.jsx
│   │   │   ├── 📂 post/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostModal.jsx
│   │   │   │   ├── PostActions.jsx
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   └── PostGrid.jsx
│   │   │   ├── 📂 story/
│   │   │   │   ├── StoryCircle.jsx
│   │   │   │   ├── StoryViewer.jsx
│   │   │   │   └── CreateStory.jsx
│   │   │   ├── 📂 comment/
│   │   │   │   ├── CommentList.jsx
│   │   │   │   └── CommentInput.jsx
│   │   │   ├── 📂 message/
│   │   │   │   ├── ChatList.jsx
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   └── MessageBubble.jsx
│   │   │   └── 📂 notification/
│   │   │       └── NotificationItem.jsx
│   │   ├── 📂 hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useSocket.js
│   │   │   ├── useInfiniteScroll.js
│   │   │   └── useDebounce.js
│   │   ├── 📂 pages/                   # Route-level page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── MessagesPage.jsx
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── SavedPostsPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── 📂 redux/                   # Redux Toolkit store
│   │   │   ├── store.js
│   │   │   └── 📂 slices/
│   │   │       ├── authSlice.js
│   │   │       ├── postSlice.js
│   │   │       ├── userSlice.js
│   │   │       ├── messageSlice.js
│   │   │       ├── notificationSlice.js
│   │   │       └── uiSlice.js
│   │   ├── 📂 socket/
│   │   │   └── socket.js               # Socket.IO client setup
│   │   ├── 📂 utils/
│   │   │   ├── formatDate.js
│   │   │   ├── formatCount.js
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── 📂 server/                          # Node.js / Express Backend
│   ├── 📂 config/
│   │   ├── db.js                       # MongoDB Atlas connection
│   │   └── cloudinary.js               # Cloudinary configuration
│   ├── 📂 controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   ├── comment.controller.js
│   │   ├── story.controller.js
│   │   ├── message.controller.js
│   │   └── notification.controller.js
│   ├── 📂 middleware/
│   │   ├── auth.middleware.js          # JWT verification
│   │   ├── upload.middleware.js        # Multer config
│   │   └── error.middleware.js         # Global error handler
│   ├── 📂 models/
│   │   ├── User.model.js
│   │   ├── Post.model.js
│   │   ├── Comment.model.js
│   │   ├── Story.model.js
│   │   ├── Message.model.js
│   │   ├── Conversation.model.js
│   │   └── Notification.model.js
│   ├── 📂 routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   ├── comment.routes.js
│   │   ├── story.routes.js
│   │   ├── message.routes.js
│   │   └── notification.routes.js
│   ├── 📂 socket/
│   │   └── socket.js                  # Socket.IO server events
│   ├── 📂 utils/
│   │   ├── generateToken.js
│   │   ├── cloudinaryUpload.js
│   │   └── ApiError.js
│   ├── app.js                         # Express app setup
│   ├── server.js                      # HTTP + Socket.IO server entry
│   └── package.json
│
├── .gitignore
├── README.md
└── LICENSE
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
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# → Fill in your values (see Environment Variables section below)

# Start the development server
npm run dev
```

The backend server will start on **http://localhost:5000**

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to client
cd client

# Install dependencies
npm install

# Start the React development server
npm run dev
```

The frontend will be available at **http://localhost:5173**

### 4. Environment Variables

#### Server (`server/.env`)

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

#### Client (`client/.env`)

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
> **Protected routes** require an `Authorization: Bearer <token>` header.

---

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `POST` | `/auth/logout` | Logout user | ✅ |
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

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/users/:username` | Get user profile by username | ✅ |
| `PUT` | `/users/profile` | Update current user profile | ✅ |
| `PUT` | `/users/avatar` | Update profile picture | ✅ |
| `POST` | `/users/:id/follow` | Follow / Unfollow a user | ✅ |
| `GET` | `/users/:id/followers` | Get user's followers list | ✅ |
| `GET` | `/users/:id/following` | Get user's following list | ✅ |
| `GET` | `/users/search?q=query` | Search users by name/username | ✅ |
| `GET` | `/users/:id/saved` | Get saved posts of current user | ✅ |

---

### Post Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/posts/feed` | Get paginated feed posts | ✅ |
| `GET` | `/posts/explore` | Get explore page posts | ✅ |
| `POST` | `/posts` | Create a new post (multipart) | ✅ |
| `GET` | `/posts/:id` | Get single post by ID | ✅ |
| `DELETE` | `/posts/:id` | Delete a post | ✅ |
| `POST` | `/posts/:id/like` | Like / Unlike a post | ✅ |
| `POST` | `/posts/:id/save` | Save / Unsave a post | ✅ |
| `GET` | `/posts/user/:userId` | Get all posts by a user | ✅ |

**Example — Create Post**
```
POST /api/posts
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
  caption: "Golden hour 🌅 #photography #nature"
  images: [file1.jpg, file2.jpg]   ← up to 10 files
```

---

### Comment Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/comments/:postId` | Get comments for a post | ✅ |
| `POST` | `/comments/:postId` | Add a comment | ✅ |
| `PUT` | `/comments/:id` | Edit your comment | ✅ |
| `DELETE` | `/comments/:id` | Delete a comment | ✅ |
| `POST` | `/comments/:id/like` | Like / Unlike a comment | ✅ |
| `POST` | `/comments/:id/reply` | Reply to a comment | ✅ |

---

### Story Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/stories/feed` | Get stories of followed users | ✅ |
| `POST` | `/stories` | Upload a new story (multipart) | ✅ |
| `GET` | `/stories/:id` | Get a single story | ✅ |
| `DELETE` | `/stories/:id` | Delete your story | ✅ |
| `POST` | `/stories/:id/view` | Mark story as viewed | ✅ |
| `GET` | `/stories/:id/viewers` | Get list of story viewers | ✅ |

---

### Message Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/messages/conversations` | Get all conversations | ✅ |
| `GET` | `/messages/:conversationId` | Get messages in a conversation | ✅ |
| `POST` | `/messages/:conversationId` | Send a message | ✅ |
| `DELETE` | `/messages/:id` | Delete a message | ✅ |
| `POST` | `/messages/conversation/new` | Start a new conversation | ✅ |

---

### Notification Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/notifications` | Get all notifications | ✅ |
| `PUT` | `/notifications/:id/read` | Mark notification as read | ✅ |
| `PUT` | `/notifications/read-all` | Mark all as read | ✅ |
| `DELETE` | `/notifications/:id` | Delete a notification | ✅ |

---

## 🗄️ Database Schema

### User Model
```javascript
{
  username:       { type: String, unique: true, required: true },
  email:          { type: String, unique: true, required: true },
  password:       { type: String, required: true },             // bcrypt hashed
  fullName:       { type: String, required: true },
  avatar:         { type: String, default: '' },                // Cloudinary URL
  bio:            { type: String, maxlength: 150 },
  website:        { type: String },
  isPrivate:      { type: Boolean, default: false },
  followers:      [{ type: ObjectId, ref: 'User' }],
  following:      [{ type: ObjectId, ref: 'User' }],
  savedPosts:     [{ type: ObjectId, ref: 'Post' }],
  timestamps:     true
}
```

### Post Model
```javascript
{
  author:         { type: ObjectId, ref: 'User', required: true },
  images:         [{ url: String, publicId: String }],          // Cloudinary
  caption:        { type: String, maxlength: 2200 },
  hashtags:       [String],
  mentions:       [{ type: ObjectId, ref: 'User' }],
  likes:          [{ type: ObjectId, ref: 'User' }],
  comments:       [{ type: ObjectId, ref: 'Comment' }],
  location:       { type: String },
  timestamps:     true
}
```

### Comment Model
```javascript
{
  post:           { type: ObjectId, ref: 'Post', required: true },
  author:         { type: ObjectId, ref: 'User', required: true },
  text:           { type: String, required: true, maxlength: 1000 },
  likes:          [{ type: ObjectId, ref: 'User' }],
  parentComment:  { type: ObjectId, ref: 'Comment', default: null },
  replies:        [{ type: ObjectId, ref: 'Comment' }],
  timestamps:     true
}
```

### Story Model
```javascript
{
  author:         { type: ObjectId, ref: 'User', required: true },
  media:          { url: String, publicId: String, type: { type: String, enum: ['image','video'] } },
  viewers:        [{ user: ObjectId, viewedAt: Date }],
  expiresAt:      { type: Date, default: () => Date.now() + 24*60*60*1000 },
  timestamps:     true
}
```

### Message & Conversation Models
```javascript
// Conversation
{
  participants:   [{ type: ObjectId, ref: 'User' }],
  lastMessage:    { type: ObjectId, ref: 'Message' },
  timestamps:     true
}

// Message
{
  conversation:   { type: ObjectId, ref: 'Conversation' },
  sender:         { type: ObjectId, ref: 'User', required: true },
  text:           { type: String },
  post:           { type: ObjectId, ref: 'Post' },              // shared post
  readBy:         [{ type: ObjectId, ref: 'User' }],
  timestamps:     true
}
```

### Notification Model
```javascript
{
  recipient:      { type: ObjectId, ref: 'User', required: true },
  sender:         { type: ObjectId, ref: 'User', required: true },
  type:           { type: String, enum: ['like', 'comment', 'follow', 'mention', 'reply'] },
  post:           { type: ObjectId, ref: 'Post' },
  comment:        { type: ObjectId, ref: 'Comment' },
  isRead:         { type: Boolean, default: false },
  timestamps:     true
}
```

---

## 🔒 Authentication & Security

Focal uses a **JWT-based stateless authentication** flow:

1. User registers or logs in → server validates credentials with **bcryptjs** (`cost factor: 12`)
2. Server signs a **JWT** (`HS256`) with the user's `_id` and an expiry
3. Client stores the token in `localStorage` (or `httpOnly` cookie for production)
4. Every protected API request sends `Authorization: Bearer <token>`
5. The `auth.middleware.js` verifies and decodes the token on every request

**Security measures implemented:**
- Passwords hashed with `bcryptjs` (salt rounds: 12)
- JWT expiry and refresh strategy
- Input validation and sanitization
- CORS configured to allow only the client origin
- Helmet.js for secure HTTP headers
- Rate limiting on auth routes
- Multer file type and size validation

---

## ☁️ Media Upload (Cloudinary + Multer)

Focal uses a two-step upload pipeline:

```
Client (file)  →  Multer (memory storage)  →  Cloudinary  →  URL saved to MongoDB
```

**Multer** is configured with `memoryStorage()` to hold the file buffer in memory temporarily. The buffer is then streamed directly to **Cloudinary** using a upload stream, avoiding any disk I/O on the server.

```javascript
// upload.middleware.js (simplified)
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },        // 10MB max
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

The client uses **Redux Toolkit** for global state management.

| Slice | State Managed |
|-------|--------------|
| `authSlice` | Current user, token, auth loading/error states |
| `postSlice` | Feed posts, explore posts, individual post cache |
| `userSlice` | Visited profiles, search results |
| `messageSlice` | Conversations list, active chat messages |
| `notificationSlice` | Notifications list, unread count |
| `uiSlice` | Modal states, dark mode, sidebar open/close |

**RTK Query** is used for data fetching with automatic caching, refetching on focus, and optimistic updates for actions like liking/saving posts.

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

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Formatting, no logic changes |
| `refactor:` | Code restructuring |
| `test:` | Adding or fixing tests |
| `chore:` | Build process or auxiliary tool changes |

### Code Style

- **ESLint** + **Prettier** are configured for both client and server
- Run `npm run lint` before opening a PR
- Aim for self-documenting code with JSDoc comments on complex functions

---

## 🛡️ License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

<div align="center">

**Your Name**

[![GitHub](https://img.shields.io/badge/GitHub-@YOUR__USERNAME-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yourprofile-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/YOUR_PROFILE)
[![Portfolio](https://img.shields.io/badge/Portfolio-yoursite.com-E1306C?style=flat-square&logo=google-chrome)](https://yoursite.com)

</div>

---

<div align="center">

⭐ **If you found this project useful, please give it a star!** ⭐

Made with ❤️ and ☕ by [Your Name](https://github.com/YOUR_USERNAME)

</div>