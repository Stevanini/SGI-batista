import { CheckCircle } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export function Header() {
  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '#about' },
    { label: 'Missões', href: '#missions' },
    { label: 'Contribua', href: '#contribute' },
    { label: 'Reflexões', href: '#reflections' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex flex-col items-center justify-center w-32">
          <Image src="/assets/img/batista_renovada.png" alt="Logo Batista Renovada" width={42} height={42} className="object-contain" priority />
          <span className={`${montserrat.className} font-normal text-[8px] text-red-500 whitespace-nowrap mt-1 tracking-widest uppercase`}>
            Batista Renovada
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group relative text-zinc-600 hover:text-zinc-800 transition-colors px-1 text-sm">
                  {item.label}
                  <span className="block absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="md:hidden">
          <CheckCircle className="w-6 h-6 text-primary" strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}
