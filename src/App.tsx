import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home.tsx';
import { Shop } from './pages/Shop.tsx';
import { ProductDetail } from './pages/ProductDetail.tsx';
import { Contact } from './pages/Contact.tsx';
import { Glossary } from './pages/Glossary.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { Preloader } from './components/Preloader';
import { GooeyFilter } from './components/GooeyFilter';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/glossary" element={<PageTransition><Glossary /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text-main font-sans selection:bg-accent selection:text-white">
        <GooeyFilter />
        <Preloader />
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
