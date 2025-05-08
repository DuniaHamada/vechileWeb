// components/Navbar.jsx
import logo from "../../assets/logoSEESERV-1.png"; 

const Navbar = () => {
  return (
<header className="bg-white text-[#086189] shadow-2xl fixed w-full z-40 top-0">
<div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="hover:text-[#064e68] text-lg font-bold transition">Home</a>
          <a href="#about" className="hover:text-[#064e68] text-lg  font-bold  transition">About</a>
          <a href="#services" className="hover:text-[#064e68] text-lg  font-bold transition">Services</a>
          <a href="#how-it-works" className="hover:text-[#064e68] text-lg  font-bold transition">How it Works</a>
          <a href="#contact" className="hover:text-[#064e68] text-lg  font-bold transition">Contact</a>
        </nav>

        {/* Call to Action */}
        <div className="hidden md:block">
          <button className="bg-[#086189] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#064e68] transition">
            Download App
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
