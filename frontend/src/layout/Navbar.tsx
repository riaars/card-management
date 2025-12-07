import CompanyLogo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="w-18">
            <img src={CompanyLogo} />
          </div>
        </div>

        <button className="md:hidden text-2xl">&#9776;</button>

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
      </div>
    </nav>
  );
};

export default Navbar;
