import visionImg from "../../assets/vision.jpg";
import missionImg from "../../assets/mission.jpg";
import whyImg from "../../assets/why.jpg";
import { motion } from "framer-motion";

const About = () => {
  const cards = [
    {
      img: visionImg,
      title: "Our Vision",
      text: "To become the most trusted platform for car services, combining innovation, convenience, and reliability to meet the evolving needs of modern vehicle owners.",
    },
    {
      img: missionImg,
      title: "Our Mission",
      text: "To deliver accessible, efficient, and high-quality maintenance solutions. We connect customers to trusted mechanics, enabling stress-free vehicle upkeep.",
    },
    {
      img: whyImg,
      title: "Why Choose Us?",
      text: "Enjoy seamless booking, transparent pricing, and dedicated customer support. Whether at home or the workshop, we bring convenience and trust to your car care.",
    },
  ];

  return (
    <section id="about" className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }} // This allows the animation to trigger every time it's in view
        >
          <h2 className="text-3xl md:text-4xl font-bold">ABOUT US</h2>
          <div className="w-20 h-1 bg-[#086189] mx-auto mt-2"></div>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mt-4">
            Smart Vehicle Maintenance is a digital solution offering flexible
            car care, secure bookings, and real-time access to services. We
            provide professional cleaning, maintenance, and reliable emergency
            services to keep your vehicle in top shape.
          </p>
        </motion.div>

        {/* Animated Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }} 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#086189] mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-700">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
