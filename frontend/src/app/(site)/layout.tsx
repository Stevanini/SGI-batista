import Header from './components/header';

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-w-[640px]">
      <Header />
      {children}
    </div>
  );
}
