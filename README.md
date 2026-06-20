# ✍️ 12-MegaBlog App

A dynamic, production-ready blogging platform built with **React**, **Tailwind CSS**, and **Appwrite Cloud**. This project is the culmination of my *Chai aur React* learning journey, featuring a custom-engineered user dashboard and robust role-based post management.

---

## 🚀 Live Demo
🔗 **[View Live Site](https://appwrite-blog-b3x1pp6yh-mahima5681.vercel.app)**

---

## 🧭 Application Flow & Dynamic Navigation

The app intelligently adapts its navigation header depending on whether a visitor is logged in or out:

### 🔒 Public Views (Logged Out)
*   **Home:** A welcome landing page.
*   **Login / Signup:** Secure account creation and session authentication powered by Appwrite Auth.

### 🔓 Private Views (Logged In)
Once authenticated, the user unlocks a fully personalized experience:
*   **Home:** Displays a dynamic feed of **Active** blogs created by all users across the platform.
*   **All Posts:** A master directory showing all posts (both Active and Inactive) across the entire application.
*   **My Posts (Custom Dashboard):** A dedicated, filtered workspace showing *only* the articles written by the logged-in user.
*   **Logout:** Securely terminates the Appwrite session.

---

## 🛡️ Content Ownership & Authorization Rules
*   **Global Visibility:** Anyone logged in can read public, active content.
*   **Strict Access Control:** The app evaluates the logged-in user's unique ID against the post's `userId`. 
*   **Edit & Delete Restrictions:** The "Edit" and "Delete" actions are hidden and blocked unless you are the exact author who created that specific post.

---

## 🛠️ Tech Stack
*   **Frontend:** React (Hooks, Context API / Redux Toolkit for auth state), Tailwind CSS, React Router DOM, React Hook Form
*   **Backend-as-a-Service:** Appwrite Cloud (Database querying, Session Management, Storage Bucket for images)
*   **Bundler & Hosting:** Vite, Vercel (Configured with rewrites for clean client-side routing)