import React from 'react'
import { FaFileAlt, FaCogs, FaDatabase, FaRobot } from "react-icons/fa";

function FeaturesSection() {

  const data = [
    {
      id: 1,
      icon: <FaFileAlt className="text-4xl text-primary mb-3" />,
      title: "Document-Aware Chat",
      desc: "Engage in context-rich conversations powered by your uploaded documents for accurate and intelligent responses.",
    },
    {
      id: 2,
      icon: <FaCogs className="text-4xl text-primary mb-3" />,
      title: "Smart Fallback System",
      desc: "Seamlessly switch to predefined responses or external knowledge when your AI model encounters gaps, ensuring reliability.",
    },
    {
      id: 3,
      icon: <FaDatabase className="text-4xl text-primary mb-3" />,
      title: "Trainable from Your Data",
      desc: "Continuously improve performance by training your chatbot on your own datasets, FAQs, and customer interactions.",
    },
    {
      id: 4,
      icon: <FaRobot className="text-4xl text-primary mb-3" />,
      title: "AI Smart Reply",
      desc: "Generate human-like responses instantly using advanced AI algorithms for a natural and efficient user experience.",
    },
  ];
  return (
    <section id="features" className='flex flex-col justify-center items-center min-h-screen pt-5'>
      <h1 className='text-4xl text-white'>Features of Chatwise</h1>
      <h1 className='text-xl text-gray-300 p-2 text-center'>Everything you need to provide exceptional customer support with the power of AI.</h1>
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-center flex flex-col items-center w-full sm:w-[45%] md:w-[30%]"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default FeaturesSection;