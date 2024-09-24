import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { Menu } from 'lucide-react';
import { useState } from "react";

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(!isOpened);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-12" />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/contactlist" className="text-gray-700 hover:text-blue-500">PhoneBook</Link>
            <Link to="/searchcontact" className="text-gray-700 hover:text-blue-500">Search</Link>
          </div>
        </div>
        <div className=" hidden md:flex items-center space-x-4">
          <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</Link>
          <Link to="/signin" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign In</Link>
        </div>
        <div className="md:hidden">
        <Menu onClick={handleOpen} className="cursor-pointer h-6 w-6 text-gray-700 md:hidden" />
        </div>
      </nav>
      {isOpened && (
        <nav className="md:hidden flex flex-col items-center space-y-4 p-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/contactlist" className="text-gray-700 hover:text-blue-500">PhoneBook</Link>
          <Link to="/searchcontact" className="text-gray-700 hover:text-blue-500">Search</Link>
          <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign Up</Link>
          <Link to="/signin" className="bg-blue-500 text-white px-4 py-2 rounded-md">Sign In</Link>
        </nav>
      )}
    </header>
  );
}

export default Navbar;