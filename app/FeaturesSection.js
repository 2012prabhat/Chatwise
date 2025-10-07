import React from 'react'
import { FaFileAlt, FaCogs, FaDatabase, FaRobot, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { motion } from 'framer-motion';

function FeaturesSection() {

   const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

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
    {
    id: 5,
    icon: <FaShieldAlt className="text-4xl text-primary mb-3" />,
    title: "Enterprise-Grade Security",
    desc: "Protect sensitive data with robust encryption, secure APIs, and compliance-ready infrastructure built for business needs.",
  },
  {
    id: 6,
    icon: <FaChartLine className="text-4xl text-primary mb-3" />,
    title: "Insightful Analytics",
    desc: "Track performance, analyze user interactions, and gain actionable insights through detailed chatbot analytics dashboards.",
  },
  ];
  return (
   <section
      id="features"
      className="flex flex-col justify-center items-center min-h-screen pt-18"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-4xl text-white gradientText"
      >
        Features of Chatwise
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-xl text-gray-300 p-2 px-6 text-center"
      >
        Everything you need to provide exceptional customer support with the
        power of AI.
      </motion.h2>

      <section className="py-16 bg-muted/50 w-full">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }} // 👈 Replay on every scroll
              transition={{ duration: 0.6, delay: index * 0.15 }} // stagger effect
              className="rounded-2xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transition duration-300 text-center flex flex-col items-center w-full sm:w-[45%] md:w-[30%] text-white cardBack"
            >
              {item.icon}
              <h3 className="text-xl text-white font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </section>
  )
}

export default FeaturesSection;