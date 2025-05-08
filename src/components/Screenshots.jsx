"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Screenshots = () => {
  const images = [
    "WhatsApp Image 2025-04-29 at 16.16.44_48afc5e3.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.45_206ebd01.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.45_4067dbcc.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.45_bbb05d4d.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.45_f4982f8f.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.46_a1e9ff99.jpg",
    "WhatsApp Image 2025-04-29 at 16.16.47_f7042b66.jpg",
  ];

  return (
    <section id="screenshots" className="py-20 px-6 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto text-center space-y-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">APP SCREENSHOTS</h2>
        <div className="w-20 h-1 bg-[#064e68] mx-auto mt-2"></div>
      </div>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={5}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 500 }}
          className="pb-16" // padding bottom to push pagination bullets down
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="p-4">
                <img
                  src={`../../assets/${img}`} // Ensure images are inside "public/images"
                  alt={`Screenshot ${index + 1}`}
                  className="rounded-xl shadow-md mx-auto max-h-[350px] object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Screenshots;
