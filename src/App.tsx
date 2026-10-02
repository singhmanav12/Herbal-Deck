import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text-main font-sans selection:bg-accent selection:text-white">
        <GooeyFilter />
        <Preloader />
        <Navbar />
        <CartDrawer />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/glossary" element={<Glossary />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
