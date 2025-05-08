import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-white text-gray-800 min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          CONTACT US
          <div className="w-20 h-1 bg-[#064e68] mx-auto mt-2"></div>
        </motion.h2>

        {/* Contact Information */}
        <motion.div
          className="flex justify-center items-center gap-16 py-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          {/* Phone Section */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <Phone className="mx-auto text-[#064e68]" size={48} />
            <h3 className="uppercase font-semibold text-gray-500">Phone/Fax</h3>
            <p className="text-lg text-gray-700">
              +970 2 295 955 0 <br />
              +970 599 678 378 | +970 569 711 088
            </p>
          </motion.div>

          {/* Vertical Divider */}
          <div className="hidden md:block h-24 border-l-2 border-gray-300"></div>

          {/* Email Section */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <Mail className="mx-auto text-[#064e68]" size={48} />
            <h3 className="uppercase font-semibold text-gray-500">Email</h3>
            <p className="text-lg text-gray-700">veeserv@gmail.com</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
