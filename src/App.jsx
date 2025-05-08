import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Screenshots from "./components/Screenshots";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import MechanicSection from "./components/MechanicSection";
import MechanicLogin from "./Pages/MechanicLogin";
import MechanicDashboard from "./Pages/MechanicDashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <div className="text-gray-800 bg-white font-['Poppins']">
              <Navbar />
              <Hero />
              <About />
              <MechanicSection />
              <Services />
              <HowItWorks />
              <Screenshots />
              <FAQ />
              <ContactUs />
              <Footer />
            </div>
          }
        />
        <Route path="/mechanic-login" element={<MechanicLogin />} />
        <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
