# Herbal Deck

Herbal Deck is a modern, responsive e-commerce web application for exploring and purchasing premium herbal products. Built with cutting-edge web technologies, it features a beautiful UI, smooth animations, and a seamless shopping experience.

## ✨ Features

- **Dynamic Shop Catalog:** Browse through a curated selection of herbal products.
- **Product Details:** Detailed views for each product with descriptions and pricing.
- **Shopping Cart:** An interactive slide-out cart drawer to manage your selected items.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
- **Smooth Animations:** Premium micro-interactions and page transitions.

## 🛠️ Tech Stack

This project is built using modern web development tools:

- **Framework:** [React 19](https://react.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to the provided local URL (usually `http://localhost:5173`).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be generated in the `dist` folder.

## 📁 Project Structure

- `src/components/` - Reusable UI components (Navbar, Footer, CartDrawer, etc.)
- `src/pages/` - Main route components (Home, Shop, ProductDetail, Contact)
- `src/context/` - React Context providers (CartContext for state management)
- `src/data/` - Mock data for products and other static content
- `src/utils/` - Utility functions

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run lint`: Runs code linting using Oxlint.
- `npm run preview`: Previews the production build locally.
