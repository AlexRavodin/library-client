import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import AuthProvider from "@/utils/AuthProvider.tsx";
import Unauthorized from "@/pages/Unathorized.tsx";
import {CreateBookPage} from "@/pages/CreateBookPage.tsx";
import LoanListPage from "@/pages/LoanListPage.tsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <Navigation/>

                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<LandingPage/>}/>
                            <Route path="/signin" element={<LoginPage/>}/>
                            <Route path="/signup" element={<RegisterPage/>}/>
                            <Route path="/logout" element={<LogoutPage/>}/>
                            <Route path="/books" element={<BookCatalogPage/>}/>
                            <Route path="/books/:stringId" element={<EditBookPage/>}/>
                            <Route path="/books/create" element={<CreateBookPage/>}/>
                            <Route path="/contact" element={<ContactPage/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/unauthorized" element={<Unauthorized/>}/>
                            <Route path="/loans" element={<LoanListPage/>}/>
                        </Routes>
                    </main>

                    <Footer/>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;