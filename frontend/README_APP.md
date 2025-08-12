# 🎬 Netflix-Style Streaming Platform

## 📌 Intro / Elevator Pitch
Hi, I’m **Georgios**, a full-stack web developer, and this is my **Netflix-style streaming platform**.  
It’s built with **React**, **TypeScript**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **REST APIs** — delivering a **secure, dynamic, and highly interactive** user experience.

The app features a **secure authentication system** with protected routes, guest mode, and a **‘Remember Me’** option.  
Users can create multiple profiles, enable a **Kids Mode** to filter adult content, and manage their favourites, likes, and dislikes in real time.

All movie and series data comes from **TMDB** and **YouTube**, with dynamic search, genre filtering, and trailers directly in the platform.  
I’ve implemented **global state management** with React Context, dynamic backgrounds, and smooth skeleton loaders for a polished UI.

This project showcases my ability to build **scalable, secure, and engaging full-stack applications** — from backend APIs to modern, responsive frontends.  

---

## 📖 Detailed Demo Walkthrough

### 1️⃣ Authentication & Secure Routes
My app uses **JWT authentication** to handle sessions.  
- Guest mode allows browsing but **disables interaction features** like liking, disliking, or bookmarking.  
- A signed-in user gets a **3-hour token-based session**.  
- The **‘Remember Me’** option stores the session in **local storage**, including the selected profile, for quick access later.

---

### 2️⃣ Profile Management
Users can:  
- Create **one or more profiles**  
- Edit profile name  
- Change profile image  
- Toggle **Kids Mode** to filter out non-kid-friendly content  

All profile actions are handled through **custom REST API endpoints** with **full CRUD functionality**.  
Depending on login type, profile and user data are stored in **session storage** or **local storage**.

---

### 3️⃣ Movie & Series Data
- Fetched from **TMDB API** — includes ratings, genres, overviews, and trailer keys.  
- Trailer keys are used for **dynamic YouTube API calls** to display official trailers directly in the app.

---

### 4️⃣ Search & Filtering
- **Global search bar** in the navbar works on all pages.  
- If there’s a query → fetches specific results from TMDB.  
- If no query → defaults to trending content.  
- Users can filter by:
  - Genre (Adventure, Comedy, Drama, etc.)  
  - Type (Movies, TV Series, Animated)  
  - Animation origin (Japanese or American)  

---

### 5️⃣ State Management & UI
The app uses **React Context API** for **global state management**, avoiding prop drilling and keeping data accessible anywhere.  

UI features:  
- ✅ **Skeleton loaders** while data is fetching  
- 🎨 **Dynamic backgrounds** that change with the selected movie  
- 📂 **Dropdown menus** for profile info and movie lists (liked, disliked, bookmarked)  
- 🔗 Quick navigation to movie detail pages

---

### 6️⃣ Movie Interaction
From a movie’s detail page, users can:  
- 👍 Like a movie  
- ❤️ Add to favourites  
- 👎 Dislike a movie  

All changes are instantly saved to their active profile and **visible when returning** to profile details.

---

### 7️⃣ Kids Mode & Content Safety
**Kids Mode** automatically:  
- Hides adult content  
- Filters out specific genres such as **Thriller** and **Horror**  

---

### 8️⃣ Future Plans
Planned feature: **Movie Buddy AI Assistant** 🎥🤖  
- Helps users find movies based on mood  
- Recommends hidden gems  
- Chats about films like a true movie nerd

---

## ✅ Closing Statement
This streaming platform combines:  
- **Secure authentication**  
- **Dynamic data fetching**  
- **State management**  
- **Responsive UI**  

into a **complete full-stack solution**.  
It’s a strong demonstration of my ability to create **real-world, scalable applications**, and I’m excited to bring these skills to your team.

---
