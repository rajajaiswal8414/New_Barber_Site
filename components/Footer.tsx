import Image from "next/image";
import Link from "next/link";
import { MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white pt-16 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-zinc-800 pb-10">
        {/* Logo & Social */}
        <div>
          <div className="flex items-center mb-4">
            <Image
              src="/logo.png"
              alt="PMC Barbershop Logo"
              width={48}
              height={48}
              className="mr-2"
            />
            <span className="font-bold text-lg">Logo</span>
          </div>
          <p className="text-[#71717B] mb-6">Classic cuts with modern style</p>
          <div className="flex space-x-3">
            <a
              href="#"
              className="bg-amber-400/80 hover:bg-amber-400 text-black rounded-full p-2 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="bg-amber-400/80 hover:bg-amber-400 text-black rounded-full p-2 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-[#71717B]">
            <li>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h4 className="font-bold mb-4">Contact Us</h4>
          <div className="flex items-start mb-2 text-[#71717B]">
            <MapPin className="h-5 w-5 text-amber-400 mr-2 mt-1" />
            <span>518 Acme St unit 101, Denton, TX 76205, United States</span>
          </div>
          <div className="text-[#71717B] ml-7">+19408081569</div>
        </div>
        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-[#71717B] mb-4">
            Subscribe to our newsletter to receive updates and news.
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="bg-zinc-900 border border-zinc-500 rounded-md px-4 py-2 text-white focus:outline-none focus:border-amber-400 transition"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-black font-medium py-2 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-6 text-[#71717B] text-sm">
        <div className="mb-2 md:mb-0">
          © 2023 PMC Barbershop. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="#" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">
            About
          </Link>
          <Link href="#" className="hover:text-amber-400 transition-colors">
            Services
          </Link>
        </div>
      </div>
    </footer>
  );
}
