import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div id="contact" className="bg-[#204b74] border-t border-t-white  text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">StudentYug</h3>
              <p className="text-gray-200 mb-4">One Student, One Tree, One Future</p>
              <p className="text-sm text-gray-300">
                Connecting students with sports guidance while promoting environmental responsibility.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <Link href="/#about" className="hover:text-yellow-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-yellow-300 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pillars" className="hover:text-yellow-300 transition-colors">
                    Our Pillars
                  </Link>
                </li>
                <li>
                  <Link href="/#impact" className="hover:text-yellow-300 transition-colors">
                    Impact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <Link href="/help-center" className="hover:text-yellow-300 transition-colors">
                    Help Center
                  </Link>
                </li>
                
                <li>
                  <Link href="/privacy-policy" className="hover:text-yellow-300 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/term-condition" className="hover:text-yellow-300 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaFacebook className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaInstagram className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaTwitter className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaLinkedin className="text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <FaYoutube className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-200">
            <p>&copy; 2026 StudentYug. All rights reserved. Growing knowledge, growing nature.</p>
          </div>
        </div>
      </div>
    </>
  );
}
