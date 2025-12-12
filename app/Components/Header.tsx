'use client';
import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't show header on dashboard routes
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  const links = [
    { link: '/', name: 'Home' },
    { link: '/#features', name: 'Features' },
    { link: '/#pillars', name: 'Our Pillars' },
    { link: '/#impact', name: 'Impact' },
    { link: '/#contact', name: 'Contact Us' }
  ];

  const NavLinks = () => (
    <ul className="flex flex-col md:flex-row gap-6 md:gap-10 capitalize">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.link}
          className="text-gray-700 hover:text-[#1c756b] transition-colors duration-300 font-medium"
          onClick={() => setMobileOpen(false)}
        >
          {link.name}
        </Link>
      ))}
    </ul>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="flex justify-center">
        <Marquee autoFill className="bg-[#204b74] font-bold text-white p-2">
          <p className="text-xl mx-2">One Student.</p>
          <p className="text-xl mx-2">One Tree.</p>
          <p className="text-xl mx-2">One Future.</p>
        </Marquee>
      </div>

      <div className="header-container flex items-center justify-between shadow px-4 sm:px-6 lg:px-10 bg-white relative z-50 w-full py-3">
        {/* logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
          <Image src="/logo.png" alt="logo" width={120} height={100} className="w-28 sm:w-32 h-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="hidden md:flex gap-3 lg:gap-5 items-center">
          <Link
            href="/login"
            className="border-[#204b74] border-2 px-4 lg:px-6 py-2 text-[#204b74] rounded-full hover:bg-[#204b74] hover:text-white transition-all duration-300 text-sm lg:text-base"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#204b74] text-white px-4 lg:px-6 py-2 rounded-full hover:bg-white hover:text-[#204b74] border  border-[#204b74] transition-all duration-300 shadow-lg text-sm lg:text-base"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <span className="sr-only">Open menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-current"></span>
            <span className="block h-0.5 w-6 bg-current"></span>
            <span className="block h-0.5 w-6 bg-current"></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-4 py-4 border-t border-gray-100">
          <div className="flex flex-col gap-4">
            <NavLinks />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="border-[#204b74] border-2 px-4 py-2 text-[#204b74] rounded-full hover:bg-[#204b74] hover:text-white transition-all duration-300 text-sm text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="bg-[#204b74] text-white px-4 py-2 rounded-full hover:bg-[#204b74] transition-all duration-300 shadow text-sm text-center"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
