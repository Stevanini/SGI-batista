'use client';

import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import ContactInfo from './contactInfo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute w-full top-0 left-0">
      <ContactInfo />
      <nav className="bg-primary/70 shadow">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-0">
          <Link href="#" className="flex items-center space-x-2">
            <Image
              src="https://demo.ovatheme.com/asting/wp-content/uploads/2021/02/logo_dark.svg"
              alt="logo"
              width={120}
              height={120}
              quality={100}
            />
          </Link>
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link href="#" className="text-gray-300 hover:border-b-2 border-orange-500 transition-all">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="eventos" className="text-gray-300 hover:border-b-2 border-orange-500 transition-all">
                Eventos
              </Link>
            </li>
            <li>
              <Link href="contato" className="text-gray-300 hover:border-b-2 border-orange-500 transition-all">
                Contato
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-5">
            <FaSearch className="text-gray-300" />

            <Link
              href={'#'}
              className="flex items-center gap-2 rounded-full bg-orange hover:bg-primary hover:bg-orange-400 transition-all text-white px-5 py-3"
            >
              <FaHeart />
              <span>Donate</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-grey-700 hover:text-orange-500 focus:outline-none">
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
          {/* <a href="#" className="hidden md:block bg-orange text-white px-4 py-2 rounded hover:bg-orange-600">Donate</a> */}
        </div>
        {isMobileMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-2 px-4 py-2 ">
            <li>
              <Link href="#" className="text-gray-700 hover:text-orange-500">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="eventos" className="text-gray-700 hover:text-orange-500">
                Eventos
              </Link>
            </li>
            <li>
              <Link href="contato" className="text-gray-700 hover:text-orange-500">
                Contato
              </Link>
            </li>
            {/* <li><a href="#" className="bg-orange text-white px-4 py-2 rounded hover:bg-orange-600">Donate</a></li> */}
          </ul>
        )}
      </nav>
    </header>
  );
}
