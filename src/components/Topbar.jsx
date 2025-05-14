import logo from "../../assets/logoSEESERV-1.png";
import profilePic from "../../assets/lo.png";

const Topbar = () => {
  const mechanicName = "Ahmad";

  
  return (
    <header className="bg-white text-[#086189] shadow-2xl fixed w-full z-40 top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Center Text */}
        <div className="text-center text-lg font-semibold hidden md:block">
          <p>
            Welcome, <span className="text-[#064e68]">{mechanicName}</span> in Mechanic App!
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4">
       
          <img
            src={profilePic}
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover border-2 border-[#086189]"
          />
       
        </div>
      </div>
    </header>
  );
};

export default Topbar;
