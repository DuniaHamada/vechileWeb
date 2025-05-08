import heroImage from "../../assets/hero-image.png";
import { motion } from "framer-motion"; 
import useInView from "../../hooks/useInView"; 

const Hero = () => {
  const [ref, isVisible] = useInView();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})`, marginTop: "50px" }} 
    >
      <div className="absolute inset-0 bg-[#086189]/30 z-10" />

      <div
        ref={ref}
        className={`relative z-20 flex flex-col items-center justify-center text-white text-center max-w-4xl mx-auto px-4 h-[calc(100vh-96px)] space-y-6 
        transition-opacity duration-1000 ease-in-out 
        ${isVisible ? "opacity-100 animate-fadeIn" : "opacity-0"}`}
      >
        {/* Title with motion */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}  
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}  
          transition={{ duration: 0.8 }}
        >
          Smart Vehicle Maintenance
        </motion.h1>

        {/* Description with motion */}
        <motion.p
          className="text-lg md:text-2xl"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }} // يتحرك للأعلى
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience effortless vehicle care with our smart solution—schedule maintenance, repairs, and detailing anytime, from anywhere, with confidence and ease.
        </motion.p>

        {/* Button with motion */}
        <motion.button
          className="bg-white text-[#086189] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Learn More
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
