# Google Login Dashboard

A simple full-stack web application that allows users to sign in using their Google account and view their profile information on a secure dashboard.

The project is built using **React**, **Node.js**, **Express**, and **MongoDB Atlas**, with **Google OAuth 2.0** for authentication and **JWT** for authorization.

---

## Live Demo

https://login-dashboard-liard.vercel.app

---

## Features

- Google Sign-In using OAuth 2.0
- Secure JWT Authentication
- Protected Dashboard
- Display logged-in user's:
  - Name
  - Email
  - Profile Picture
- Default avatar using user's initial if profile image is unavailable
- Store user details in MongoDB Atlas
- Prevent duplicate user records
- Logout functionality
- Responsive UI for desktop and mobile devices

---

## Project Flow

```text
Login Page
      ↓
Google Sign In
      ↓
Dashboard
      ↓
View User Details
      ↓
Logout
      ↓
Back to Login Page
```

---

### Deployment
- Frontend - Vercel
- Backend - Render
