'use client';
import Image from 'next/image';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { SocialLinks } from '~/components/atoms/SocialLinks';
import { useContato } from '../../../hooks/useContato';

export const Footer: React.FC = () => {
  const { contato } = useContato();

  return (
    <footer className="relative w-full bg-[#23202B] text-white pt-16 pb-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#23202B]/90 pointer-events-none z-0" />
      <div className="relative z-10 container-1560 px-4 md:px-8 mx-auto flex flex-col md:flex-row flex-wrap gap-12 md:gap-8 justify-around items-center md:items-start text-center md:text-left">
        {/* Logo e descrição */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="flex flex-col items-center mb-4 text-center">
            <Image src="/assets/img/batista_renovada.png" alt="Logo Batista Renovada" width={42} height={42} className="object-contain" priority />
            <span className="font-normal text-[10px] text-red-500 whitespace-nowrap mt-1 tracking-widest uppercase">Batista Renovada</span>
          </div>
          <p className="text-zinc-300 mb-6 max-w-xs text-center md:text-left">
            Asting is a non-profit organization to support people worldwide and keep an eye in the future Support.
          </p>
          <SocialLinks className="mt-2 mb-4" iconSize={24} />
        </div>
        {/* Explore */}
        {/* Contribua */}
        <div className="flex flex-col gap-4 items-center md:items-start mb-8 md:mb-0">
          <h4 className="font-extrabold text-lg mb-2">Contribua</h4>
          <p className="text-zinc-300 mb-4 max-w-xs text-center md:text-left">
            Com colaboradores e voluntários entusiasmados, estamos prontos para apoiar você a qualquer momento.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 py-3 flex items-center gap-2 text-base transition shadow-md">
            <span className="text-xl">❤</span> Contribuir
          </button>
        </div>
        {/* Contact */}
        <div className="flex flex-col gap-4 mb-8 md:mb-0 items-center md:items-start">
          <h4 className="font-extrabold text-lg mb-2">Contato</h4>
          <div className="flex items-center gap-2 text-zinc-300 mb-2">
            <FiPhone className="text-orange-400" /> {contato?.telefone}
          </div>
          <div className="flex items-center gap-2 text-zinc-300 mb-2">
            <FiMail className="text-orange-400" />
            {contato ? (
              <a href={`mailto:${contato.email}`} className="underline hover:text-orange-400 transition">
                {contato.email}
              </a>
            ) : (
              'needhelp@company.com'
            )}
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <FiMapPin className="text-orange-400" /> {contato?.endereco}
          </div>
        </div>
      </div>
      <div className="relative z-10 container-1560 px-4 md:px-8 mx-auto mt-10 border-t border-zinc-700 pt-6 flex flex-col md:flex-row items-center justify-center text-zinc-400 text-sm gap-2 text-center">
        <span>© Copyright 2025 by Batista Renovada</span>
      </div>
    </footer>
  );
};
