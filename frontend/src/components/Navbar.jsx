import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuth();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Departments', path: '/departments' },
        { name: 'Admissions', path: '/admissions' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-lg leading-tight">College</span>
                            <span className="text-xs text-gray-600 leading-tight">Excellence in Education</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(link.path)
                                        ? 'text-orange-600 bg-orange-50'
                                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all shadow-md hover:shadow-lg"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'text-blue-600 bg-blue-50'
                                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2 border-t">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 text-center"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
