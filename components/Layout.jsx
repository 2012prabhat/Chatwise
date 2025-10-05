import Navbar from "./Navbar";
import ChatWidget from "@/components/ChatWidget";

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Scrollable Main (full width + fills rest of screen) */}
      <main className="flex-1 overflow-y-auto w-full p-6">
        {children}
      </main>
       <ChatWidget />
    </div>
  );
}
