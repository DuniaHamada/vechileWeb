import { Link } from "react-router-dom";

export default function MechanicSection() {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 py-16 px-6 mt-16 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/mechanic-bg.png')] bg-cover bg-center opacity-10 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-down">
        <h2 className="text-3xl md:text-4xl font-bold text-[#064e69] mb-4">
          Are You a Mechanic?
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Log in to your dashboard to manage bookings, view reports, and handle your workshop efficiently.
        </p>
        <Link
          to="/mechanic-login"
          className="inline-block bg-[#064e69] text-white text-lg font-medium px-6 py-3 rounded-full shadow-md hover:bg-[#064e69] transition-transform hover:scale-105"
        >
          Log in Now
        </Link>
      </div>
    </section>
  );
}
