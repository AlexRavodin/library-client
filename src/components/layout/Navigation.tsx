import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "../ui/button"
import {LogOut, Settings, User} from 'lucide-react';
import {useAuth} from "@/utils/AuthProvider.tsx";

const Navigation: React.FC = () => {
    const authContext = useAuth();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        setIsAuthenticated(authContext.user !== null);
    }, [authContext.user]);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleAuth = authContext.logout;

    return (
        <nav className="w-full bg-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold text-gray-800">BookStore</Link>

                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="text-gray-800 hover:text-teal-600">Home</Link>
                        <Link to="/books" className="text-gray-800 hover:text-teal-600">Catalog</Link>
                        <Link to="/about" className="text-gray-800 hover:text-teal-600">About</Link>
                        <Link to="/contact" className="text-gray-800 hover:text-teal-600">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        {isAuthenticated ? (
                            <div className="relative">
                                <Button
                                    variant="transparent"
                                    size="default"
                                    onClick={toggleDropdown}
                                    className="rounded-full"
                                >
                                    <User className="h-5 w-5"/>
                                </Button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48  rounded-md shadow-lg py-1 z-10">
                                        <Link to="/account"
                                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <User className="w-4 h-4 mr-2"/>
                                            Account
                                        </Link>
                                        <Link to="/loans"
                                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Settings className="w-4 h-4 mr-2"/>
                                            Loans
                                        </Link>
                                        <button
                                            onClick={toggleAuth}
                                            className="flex items-center w-full px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 focus:outline-none"
                                        >
                                            <LogOut className="w-4 h-4 mr-2"/>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link to="/signin">Sign In</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/signup">Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden mt-3">
                    <div className="flex flex-col space-y-2">
                        <Link to="/" className="text-gray-800 hover:text-teal-600">Home</Link>
                        <Link to="/catalog" className="text-gray-800 hover:text-teal-600">Catalog</Link>
                        <Link to="/about" className="text-gray-800 hover:text-teal-600">About</Link>
                        <Link to="/contact" className="text-gray-800 hover:text-teal-600">Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

