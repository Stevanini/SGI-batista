import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 24 }) => (
  <div className={`flex gap-4 justify-center ${className}`}>
    <a
      href="#"
      className="rounded-full bg-[#4267B2] w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition"
      aria-label="Facebook"
    >
      <FaFacebookF size={iconSize} />
    </a>
    <a
      href="#"
      className="rounded-full bg-[#1DA1F2] w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition"
      aria-label="Twitter"
    >
      <FaTwitter size={iconSize} />
    </a>
    <a href="#" className="rounded-full bg-[#e130a0] w-10 h-10 flex items-center justify-center text-white text-2xl hover:scale-110 transition">
      <FaInstagram />
    </a>
    <a
      href="#"
      className="rounded-full bg-[#FF0000] w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition"
      aria-label="YouTube"
    >
      <FaYoutube size={iconSize} />
    </a>
  </div>
);
