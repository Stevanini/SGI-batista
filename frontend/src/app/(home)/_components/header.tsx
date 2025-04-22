'use client';
import { Menu, X } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore: Não há tipos para scroll-into-view
import scrollIntoView from 'scroll-into-view';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
});

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contribua', href: '#contribute' },
    { label: 'Missões', href: '#missions' },
    { label: 'Reflexões', href: '#reflections' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Contato', href: '#contact' },
  ];

  // Bloquear scroll quando menu estiver aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuOpen]);

  // Função para scroll suave considerando header fixo
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href === '/' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      scrollIntoView(el, {
        time: 500,
        align: { top: 0, topOffset: 80 },
      });
    } else {
      window.location.hash = href;
    }
  };

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
                {item.href === '/' ? (
                  <a
                    href="/"
                    className="group relative text-zinc-600 hover:text-zinc-800 transition-colors px-1 text-sm"
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.label}
                    <span className="block absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </a>
                ) : item.href.startsWith('#') ? (
                  <a
                    href={item.href}
                    className="group relative text-zinc-600 hover:text-zinc-800 transition-colors px-1 text-sm"
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                  >
                    {item.label}
                    <span className="block absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </a>
                ) : (
                  <Link href={item.href} className="group relative text-zinc-600 hover:text-zinc-800 transition-colors px-1 text-sm">
                    {item.label}
                    <span className="block absolute left-0 right-0 -bottom-1 h-[2px] bg-primary rounded transition-transform duration-300 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="w-7 h-7 text-primary" strokeWidth={2.5} />
        </button>
      </div>
      {menuOpen &&
        typeof window !== 'undefined' &&
        document.body &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-[100]">
            <div className="absolute inset-0 bg-black/70" onClick={() => setMenuOpen(false)} />
            <aside className="absolute inset-0 bg-white h-full w-full p-6 flex flex-col gap-6 animate-slide-in">
              <button className="absolute top-4 right-4" onClick={() => setMenuOpen(false)}>
                <X className="w-7 h-7 text-zinc-700" />
              </button>
              <ul className="flex flex-col gap-4 mt-20">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    {item.href === '/' ? (
                      <a
                        href="/"
                        className="block text-zinc-700 text-lg font-semibold hover:text-primary transition"
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.label}
                      </a>
                    ) : item.href.startsWith('#') ? (
                      <a
                        href={item.href}
                        className="block text-zinc-700 text-lg font-semibold hover:text-primary transition"
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-zinc-700 text-lg font-semibold hover:text-primary transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </div>,
          document.body
        )}
    </header>
  );
}
