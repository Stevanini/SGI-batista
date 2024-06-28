'use client';

import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authenticated } from './(site)/components/authenticated';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// export const metadata: Metadata = {
//   title: 'SGI - Igreja Batista',
//   description: 'Sistema de Gestão da Igreja',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { push } = useRouter();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = authenticated();

    setIsUserAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      push('/login');
    }
  }, [isUserAuthenticated]);

  return (
    <html lang="pt">
      <body className={inter.className}>
        {/* {!isUserAuthenticated && null}
        {isUserAuthenticated && children} */}
        {children}
      </body>
    </html>
  );
}
