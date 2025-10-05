"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token"); // or check cookie
      if (!token) {
        router.replace("/login");
      }
    }, [router]);

    return <Component {...props} />;
  };
}
