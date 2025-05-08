import { useState, useEffect, useRef } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const faqRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const faqs = [
    {
      question: "What is Veeserv?",
      answer:
        "Veeserv is a modern platform that simplifies car maintenance and cleaning services. Whether you need repairs, maintenance, or cleaning, Veeserv offers flexible options to suit your needs.",
    },
    {
        question: "How can I download the app?",
        answer: "You can download the app from the App Store or Google Play Store.",
      },
    {
      question: "How does Veeserv work?",
      answer: "Simply visit our website or mobile app, choose your service, select a location, and book an appointment. You can opt for mobile services at your location or visit a nearby workshop.",
    },
    {
      question: "Who can use Veeserv?",
      answer: "Veeserv is designed for all vehicle owners who want quick, reliable, and hassle-free car care services.",
    },
    {
      question: "What services does Veeserv provide?",
      answer: "We offer a wide range of services, including car repairs, routine maintenance, cleaning, emergency roadside assistance, and more.",
    },
    {
      question: "How do I book a service on Veeserv?",
      answer: "Visit our app, select the service you need, choose your location, and pick a convenient time. It’s that easy!",
    },
    {
      question: "Can I leave feedback or rate a service?",
      answer: "Yes, Veeserv includes a user feedback system where you can rate services and leave reviews to help others make informed decisions.",
    },
  ];

  // Intersection Observer to toggle visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    return () => {
      if (faqRef.current) {
        observer.unobserve(faqRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={faqRef}
      className={`faq-container max-w-2xl mx-auto py-20 h-full transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
    <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl  font-bold">FAQ</h2>
        <div className="w-20 h-1 bg-[#064e68] mx-auto mt-2"></div>
      </div>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex justify-between items-center w-full bg-white border border-gray-300 p-3 rounded-md hover:bg-gray-100"
          >
            <span className="text-xl font-medium text-[#064e68]">
              {faq.question}
            </span>
            <span className="text-lg font-bold">
              {openIndex === index ? "-" : "+"}
            </span>
          </button>
          {openIndex === index && (
            <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-gray-800">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
