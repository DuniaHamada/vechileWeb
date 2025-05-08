import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#064e69] text-white py-10 font-serif">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between justify-center gap-10 text-center md:text-left">
          {/* Company Info */}
          <div className="md:w-1/4">
            <h3 className="text-xl font-bold mb-4">VeeServ</h3>
            <p className="text-sm leading-relaxed">
              Dedicated to providing the best services for your vehicle needs.
              Contact us for more information.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/2 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="flex flex-col sm:flex-row sm:justify-center gap-4 text-sm">
              <li>
                <a href="#services" className="hover:text-gray-300 transition-colors">Services</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
              </li>
              <li>
                <a href="#home" className="hover:text-gray-300 transition-colors">Home</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 text-lg">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/30 mt-10 pt-4 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} VeeServ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
