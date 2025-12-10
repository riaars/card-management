import { Link } from "react-router-dom";
import CompanyLogo from "../assets/logo.png";
import * as PATH from "@/config/Path";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-18">
            <Link to={PATH.DASHBOARD}>
              <img src={CompanyLogo} />
            </Link>
          </div>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          &#9776;
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="text-gray-700 hover:text-purple-600 font-semibold"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-purple-600  font-semibold"
          >
            About us
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-purple-600 font-semibold"
          >
            Contact
          </a>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white  shadow-lg">
            <div className="flex flex-col px-4 py-3 space-y-3">
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                About us
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
