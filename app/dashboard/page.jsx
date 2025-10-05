"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";



function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {user ? (
          <div className="bg-white p-6 rounded shadow">
            <p className="text-lg">
              Welcome back, <span className="font-semibold">{user.name}</span>{" "}
              👋
            </p>
            <p className="text-gray-600 mt-2">
              Company: <span className="font-medium">{user.company}</span>
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Loading user info...</p>
        )}

        {/* Future: Add analytics here */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold text-lg">FAQs</h2>
            <p className="text-gray-600">
              Manage your knowledge base in the FAQ section.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold text-lg">Chatbot</h2>
            <p className="text-gray-600">
              Get your embed code and integrate it with your site.
            </p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="font-semibold text-lg">Settings</h2>
            <p className="text-gray-600">
              Update your profile and company details.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}


export default DashboardPage;
