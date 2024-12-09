import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-between items-center">
          <p className="text-gray-600 w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
            &copy; 2023 BookStore. All rights reserved.
          </p>
          <div className="flex space-x-4 w-full sm:w-auto justify-center sm:justify-end">
            <Link to="/privacy" className="text-gray-600 hover:text-teal-600">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-teal-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

