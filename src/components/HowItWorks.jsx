import { FaUserCheck, FaCar, FaMapMarkedAlt, FaCogs, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Sign In / Register",
    description: "Create an account as a client or mechanic to access personalized features.",
    icon: <FaUserCheck className="text-[#086189] text-4xl mx-auto mb-4" />
  },
  {
    title: "2. Add Your Vehicle",
    description: "Easily register your car's details to streamline future service bookings.",
    icon: <FaCar className="text-[#086189] text-4xl mx-auto mb-4" />
  },
  {
    title: "3. Select Service & Location",
    description: "Choose from maintenance, cleaning, or emergency services and set your preferred location.",
    icon: <FaMapMarkedAlt className="text-[#086189] text-4xl mx-auto mb-4" />
  },
  {
    title: "4. Schedule & Confirm",
    description: "Pick a suitable time and confirm your appointment via the app.",
    icon: <FaCogs className="text-[#086189] text-4xl mx-auto mb-4" />
  },
  {
    title: "5. Secure Payment",
    description: "Make safe digital payments with confidence through our secure system.",
    icon: <FaLock className="text-[#086189] text-4xl mx-auto mb-4" />
  },
  {
    title: "6. Track & Relax",
    description: "Track your service in real time and rate the mechanic afterward to help others.",
    icon: <FaCheckCircle className="text-[#086189] text-4xl mx-auto mb-4" />
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">HOW IT WORKS</h2>
          <div className="w-20 h-1 bg-[#064e68] mx-auto mt-2"></div>
        </div>
        
        {/* Section Description */}
        <p className="text-lg text-gray-600">
          Manage your car maintenance the smart way from registration to real-time service tracking and secure payments.
        </p>
        
        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Start from left or right
              whileInView={{ opacity: 1, x: 0 }} // Move to center
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }} // Keeps the animation active each time it's in view
              className="p-6"
            >
              <div>{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
