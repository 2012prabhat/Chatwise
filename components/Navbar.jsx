"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `hover:underline px-2 py-1 rounded ${pathname === path ? "underline font-semibold" : "opacity-90"
    }`;

  return (
    <nav className="bg-[var(--mainCol)] text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <img className="h-8 rounded-full" src="logoCircle.png" alt="" />
          Chatwise
        </Link>



        <div className="space-x-4 flex items-center">

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/knowledgebase" className={linkClass("/knowledgebase")}>
            Knowledge Base
          </Link>

          <Link href="/integration" className={linkClass("/integration")}>
            Integration
          </Link>



          {/* Example external link (use <a> for external) */}
          {/* <a
            href="https://example.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline px-2 py-1 rounded opacity-90"
          >
            Docs
          </a> */}
        </div>
      </div>
    </nav>
  );
}
