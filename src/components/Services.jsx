import {
  FaCar,
  FaBroom,
  FaTools,
  FaBolt,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    icon: <FaCar className="text-[#086189] text-4xl" />,
    title: "Smart Vehicle Maintenance",
    description:
      "Comprehensive digital solution for flexible car care with real-time provider access.",
  },
  {
    icon: <FaBroom className="text-[#086189] text-4xl" />,
    title: "Professional Car Cleaning",
    description:
      "Interior and exterior cleaning to keep your vehicle spotless and well-maintained.",
  },
  {
    icon: <FaTools className="text-[#086189] text-4xl" />,
    title: "Comprehensive Repairs",
    description:
      "Advanced diagnostics and repairs to ensure your car operates at peak performance.",
  },
  {
    icon: <FaBolt className="text-[#086189] text-4xl" />,
    title: "Emergency Services",
    description:
      "Quick response for breakdowns, battery jumpstarts, and roadside assistance.",
  },
  {
    icon: <FaClock className="text-[#086189] text-4xl" />,
    title: "On-Demand & Scheduled Services",
    description:
      "Book now or schedule services based on your convenience and availability.",
  },
  {
    icon: <FaShieldAlt className="text-[#086189] text-4xl" />,
    title: "Safe & Secure Booking",
    description:
      "Trusted platform with secure online booking and verified service providers.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">SERVICES</h2>
          <div className="w-20 h-1 bg-[#064e68] mx-auto mt-2"></div>
        </div>

        {/* Section Description */}
        <p className="text-center text-lg text-gray-600">
          Smart Vehicle Maintenance offers flexible, tech-driven car care
          services from professional cleaning to maintenance and emergency
          support ensuring your vehicle stays in top condition anytime,
          anywhere.
        </p>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotate: 15 }}  
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}  
              transition={{ duration: 1, delay: index * 0.2 }}
              viewport={{ once: false }} 
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition space-y-4"
            >
              <div>{service.icon}</div>
              <h3 className="text-lg font-bold">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
