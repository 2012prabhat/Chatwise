"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Customer Success Manager",
    review:
      "ChatWise completely transformed our customer support workflow. The AI replies are smart, quick, and super accurate!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sana Verma",
    role: "Product Lead",
    review:
      "We integrated ChatWise in under an hour and saw a 40% drop in response time. It’s like having an extra team member!",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Founder, TechNest",
    review:
      "The natural conversations and learning capabilities of ChatWise are top-notch. Highly recommended for startups!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-4 pt-16 text-white text-center">
      <h1 className="text-4xl font-bold gradientText mb-4 back1">What Our Users Say</h1>
      <p className="text-gray-400 mb-10">
        Hear from some of our amazing users who are making customer support smarter with ChatWise.
      </p>

      <div className="mx-auto px-24">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={50}
          slidesPerView={1}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="cardBack p-8 rounded-2xl shadow-lg flex flex-col items-center transition-all duration-300 hover:scale-[1.02]">
                <p className="text-gray-300 italic mb-4 text-2xl">“{item.review}”</p>

                <div className="flex justify-center mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>

                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
