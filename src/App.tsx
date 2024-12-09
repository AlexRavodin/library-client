import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import './App.css';
import RegisterPage from "@/pages/RegisterPage.tsx";
import BookCatalogPage from "@/pages/BookCatalogPage";
import {EditBookPage} from "@/pages/EditBookPage.tsx";
import ContactPage from "@/pages/ContactPage.tsx";
import AboutPage from "@/pages/AboutPage.tsx";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/signin" element={<LoginPage />} />
                        <Route path="/signup" element={<RegisterPage />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/books" element={<BookCatalogPage />} />
                        <Route path="/books/:id" element={<EditBookPage />} />
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;