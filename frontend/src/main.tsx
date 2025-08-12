import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </StrictMode>
);

// MAKE IT SO THE USER CAN DELETE THE USER IT SELF NOT JUST THE PROFILE AND CHANGE PASSWORD
// AND THEN A CHATBOT SOMEWHERE TO CHAT AND RECOOMEND MOVIES



// DONT DELETE
// Intro / Elevator Pitch
// *"Hi, I’m Georgios, a full-stack web developer, and this is my Netflix-style streaming platform.
// It’s built with React, TypeScript, Tailwind, Node.js, Express, MongoDB, and REST APIs — delivering a secure, dynamic, and highly interactive user experience.

// The app features a secure authentication system with protected routes, guest mode, and a ‘Remember Me’ option. Users can create multiple profiles, enable a Kids Mode to filter adult content, and manage their favourites, likes, and dislikes in real time.

// All movie and series data comes from TMDB and YouTube, with dynamic search, genre filtering, and trailers directly in the platform. I’ve implemented global state management with React Context, dynamic backgrounds, and smooth skeleton loaders for a polished UI.

// This project showcases my ability to build scalable, secure, and engaging full-stack applications — from backend APIs to modern, responsive frontends.
// Now, let’s take a closer look at how everything works."*

// Detailed Demo Walkthrough

// 1. Authentication & Secure Routes
// "My app uses JWT authentication to handle sessions. Guest mode allows browsing but disables interaction features like liking, disliking, or bookmarking.
// A signed-in user gets a 3-hour token-based session, and with the ‘Remember Me’ option, their session is stored in local storage — including their selected profile — for quick access later."

// 2. Profile Management
// "Users can create one or more profiles, edit names, change images, and toggle a Kids Mode state variable to filter out non-kid-friendly content.
// All profile actions are powered by my own REST API endpoints supporting full CRUD functionality. Depending on login type, the profile and user data are stored in either session storage or local storage."

// 3. Movie & Series Data
// "I fetch all movie and series data from TMDB’s API, including ratings, genres, overviews, and trailer keys.
// Those trailer keys are then used in dynamic API calls to YouTube, allowing users to watch trailers directly within the app."

// 4. Search & Filtering
// "My global search bar in the navbar works everywhere. If there’s a query, it searches TMDB; if not, it defaults to trending content.
// Users can filter by genre — Adventure, Comedy, Drama, etc. — or by type, including movies, TV series, and animated series with Japanese or American filters."

// 5. State Management & UI
// "I wrapped the entire app in a Global Provider using React Context API, which eliminates prop drilling and makes state accessible anywhere.
// The UI is designed for smooth user experience:

// Skeleton loaders while data is fetching

// Dynamic backgrounds that change with the selected movie

// Dropdown menus showing profile info, liked/disliked/bookmarked movies, and quick navigation to detail pages"

// 6. Movie Interaction
// "From a movie’s detail page, users can like, dislike, or add it to their favourites. All changes are instantly saved to their active profile and visible when returning to their profile details."

// 7. Kids Mode & Content Safety
// "Kids Mode automatically hides adult content and certain genres like Thriller or Horror, ensuring a safe viewing environment."

// 8. Future Plans
// "I’m planning to add a Movie Buddy AI assistant — a chatbot that will help users find movies based on mood, recommend hidden gems, or just geek out about films."

// Closing
// "This streaming platform combines secure authentication, dynamic data fetching, state management, and a responsive UI into a complete full-stack solution.
// It’s a strong demonstration of my ability to create real-world, scalable applications — and I’m excited to bring these skills to your team."