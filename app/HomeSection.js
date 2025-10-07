import React from 'react'
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function HomeSection() {
    const router = useRouter();
    return (
        <section id="home" className="min-h-[calc(100vh-65px)] p-4 flex flex-col items-center justify-center">
           <h1
            className="text-5xl gradientText"
          >
            ChatWise
          </h1>
            <h1 className="text-4xl text-center italic font-bold text-white mt-2">Simplifying Support With Intelligence</h1>
            <h2 className="text-gray-300 md:px-44 text-center text-2xl mt-12">Transform your customer support with AI that understands your business. Train it on your docs, customize its persona, and watch it handle inquiries 24/7.</h2>
            <div className="mt-12 flex gap-6">
                <button
                    className="bg-white flex items-center gap-2 text-black px-4 py-1 rounded rounded-lg hover:bg-gray-200 transition duration-300 group font-semibold cursor-pointer"
                    onClick={() => router.push("/get-started")}
                >
                    Get Started
                    <FaChevronRight className="transition-transform duration-300 group-hover:translate-x-1 " />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded cursor-pointer text-white backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition duration-300 rounded rounded-lg">
                    <FaPlay className="text-white" />
                    Watch Demo
                </button>
            </div>


        </section>
    )
}

export default HomeSection