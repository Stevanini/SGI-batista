import { CalendarCheck, Users } from 'lucide-react';

export function Welcome() {
  return (
    <section
      id="about"
      className="w-full flex justify-end items-center py-16 relative"
      style={{
        backgroundImage: 'url(/assets/img/background/bg-hands.webp)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-1560 max-w-xl w-full mr-16 px-4 md:px-8">
        <span className="block text-primary text-lg md:text-xl mb-2 text-right" style={{ fontFamily: 'Shadows Into Light, cursive' }}>
          BEM-VINDO À NOSSA CASA
        </span>
        <h2 className="text-5xl md:text-6xl font-extrabold text-zinc-900 mb-4 text-right font-serif">Batista Renovada</h2>
        <p className="text-zinc-400 text-base md:text-lg mb-6 text-right">
          Venha celebrar conosco, participar dos nossos cultos, lugar de edificação.
        </p>
        <h3 className="text-xl font-bold text-zinc-900 mb-2 text-right">Dias de culto</h3>
        <ul className="space-y-2 text-right">
          <li className="flex items-center justify-end gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={2.5} />
            </span>
            <span className="text-zinc-800">Culto de Oração - Quartas Feiras das 19:30 às 21h</span>
          </li>
          <li className="flex items-center justify-end gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={2.5} />
            </span>
            <span className="text-zinc-800">Culto da Família - Quintas feiras das 19:30 às 21h</span>
          </li>
          <li className="flex items-center justify-end gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={2.5} />
            </span>
            <span className="text-zinc-800">Escola Bíblica - Domingo das 9h às 10:30</span>
          </li>
          <li className="flex items-center justify-end gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6">
              <CalendarCheck className="w-4 h-4 text-primary" strokeWidth={2.5} />
            </span>
            <span className="text-zinc-800">Culto de Celebração - Domingo das 19h às 21h</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
