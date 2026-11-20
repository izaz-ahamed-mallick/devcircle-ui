# DevCircle – Frontend

[![Live Demo](https://img.shields.io/badge/Live-Demo-6C63FF?style=for-the-badge)](https://devcircle.izazahamedmallick.co.in/)
[![Frontend Repository](https://img.shields.io/badge/Frontend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/izaz-ahamed-mallick/devcircle-ui)
[![Backend Repository](https://img.shields.io/badge/Backend-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/izaz-ahamed-mallick/devcircle-be)

DevCircle is a full-stack developer networking platform designed to help developers connect, build professional relationships, explore developer profiles, and discover collaboration opportunities.

This repository contains the **frontend application**. The backend is maintained separately in its own repository.

## 🌐 Live Demo

**[Visit DevCircle](https://devcircle.izazahamedmallick.co.in/)**

## 🔗 Project Repositories

| Repository | Description |
| --- | --- |
| [devcircle-ui](https://github.com/izaz-ahamed-mallick/devcircle-ui) | React frontend application |
| [devcircle-be](https://github.com/izaz-ahamed-mallick/devcircle-be) | Backend REST API |

## ✨ Features

- **Authentication** – User registration and login.
- **Developer Profiles** – Create, update, and explore developer profiles.
- **Connections** – Send, accept, reject, and manage connection requests.
- **Profile Visitors** – Track profile visitors and view visitor details according to subscription access.
- **Notifications** – Receive updates about connection requests and profile activity.
- **Subscription Plans** – Explore subscription plans and premium features.
- **Payment Integration** – Razorpay integration using Test Mode for subscription payment development and testing.
- **Reusable UI Components** – Consistent interface built with reusable React components.
- **Responsive Interface** – Layouts designed for different screen sizes.
- **API Caching** – Server-state management and caching with TanStack React Query.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| React.js | Frontend library |
| Vite | Development server and build tool |
| React Router | Client-side routing |
| TanStack React Query | Server-state management, caching, and API synchronization |
| Axios | HTTP requests and API integration |
| Tailwind CSS | Utility-first styling |
| DaisyUI | UI components |
| Lucide React | Icons |
| React Icons | Additional icons |
| Sonner | Toast notifications |

## 📁 Project Structure

```text
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
├── hooks/           # Custom hooks, including React Query hooks
├── pages/           # Application pages
├── utils/           # API functions and utilities
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

*This is a high-level overview. The repository may contain additional files and folders.*

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the frontend repository

```bash
git clone https://github.com/izaz-ahamed-mallick/devcircle-ui.git
```

### 2. Navigate to the project directory

```bash
cd devcircle-ui
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the backend API base URL:

```env
VITE_API_BASE_URL=YOUR_BACKEND_API_URL
```

Use the exact environment variable name expected by the Axios configuration in this project. Replace the placeholder with your deployed backend URL.

### 5. Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal (typically http://localhost:5173).

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🔌 Backend

The frontend communicates with the separately maintained backend through REST APIs.

**Backend repository:** [devcircle-be](https://github.com/izaz-ahamed-mallick/devcircle-be)

The backend repository contains the server-side implementation and its own setup instructions.

## 💳 Payment Integration

DevCircle integrates Razorpay for subscription payments. The current integration uses **Razorpay Test Mode** for development and testing. Live payment processing requires the appropriate production account configuration.

## 👨‍💻 Author

**Izaz Ahamed Mallick**  
Full-Stack Developer

- **GitHub:** [izaz-ahamed-mallick](https://github.com/izaz-ahamed-mallick)
- **LinkedIn:** [Izaz Ahamed Mallick](https://www.linkedin.com/in/izaz-ahamed-mallick/)

---

If you find DevCircle interesting, check out the live application and both repositories. Feedback is welcome!
