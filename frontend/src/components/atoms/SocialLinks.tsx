import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = '', iconSize = 24, facebook, instagram, youtube }) => (
  <div className={`flex gap-4 justify-center ${className}`}>
    {facebook && (
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#4267B2] w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition"
        aria-label="Facebook"
      >
        <FaFacebookF size={iconSize} />
      </a>
    )}
    {instagram && (
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#e130a0] w-10 h-10 flex items-center justify-center text-white text-2xl hover:scale-110 transition"
        aria-label="Instagram"
      >
        <FaInstagram size={iconSize} />
      </a>
    )}
    {youtube && (
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#FF0000] w-10 h-10 flex items-center justify-center text-white hover:scale-110 transition"
        aria-label="YouTube"
      >
        <FaYoutube size={iconSize} />
      </a>
    )}
  </div>
);
