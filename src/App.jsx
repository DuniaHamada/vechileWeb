// App.jsx
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
import WorkshopProfile from "./Pages/WorkshopProfile";
import ServicesPricing from "./Pages/ServicesPricing";
import BookingManagement from "./Pages/BookingManagement";
import SpecialOffers from "./Pages/SpecialOffers";
import Reports from "./Pages/Reports.jsx";

import MechanicLayout from "./components/MechanicLayout";

const App = () => {
  return (
    <Router>
      <Routes>
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

        {/* صفحة تسجيل دخول الميكانيكي */}
        <Route path="/mechanic-login" element={<MechanicLogin />} />

        {/* لوحة تحكم الميكانيكي (باستخدام Layout خاص) */}
        <Route path="/mechanic-dashboard" element={<MechanicLayout />}>
          <Route index element={<MechanicDashboard />} />
          <Route path="profile" element={<WorkshopProfile />} />
          <Route path="services" element={<ServicesPricing />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="offers" element={<SpecialOffers />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
