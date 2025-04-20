import Image from 'next/image';
import Link from 'next/link';

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
        <Link href="/" className="relative h-12 w-48">
          <Image src="/logo.svg" alt="Logo Batista Renovada" fill className="object-contain" priority />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-text-primary hover:text-primary transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}
