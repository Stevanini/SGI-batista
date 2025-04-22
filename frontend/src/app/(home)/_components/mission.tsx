import { Heart } from 'lucide-react';

const pattern =
  "url(\"data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0L120 60L60 120L0 60L60 0Z' fill='white' fill-opacity='0.02'/%3E%3C/svg%3E\")";

export function Mission() {
  return (
    <section id="missions" className="w-full py-16 bg-[#FCFAF6]">
      <div className="container-1560 flex flex-col md:flex-row items-center md:justify-between justify-center gap-8 px-4 md:px-8">
        {/* Esquerda */}
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-8 max-w-3xl">
          <div className="flex-1">
            <span className="block text-primary text-2xl mb-2" style={{ fontFamily: 'Shadows Into Light, cursive' }}>
              Missões
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 font-serif">Bazar missionário</h2>
            <p className="text-zinc-400 text-base md:text-lg mb-6">
              Nosso bazar missionário é uma iniciativa solidária para apoiar projetos sociais e missionários da igreja. Cada contribuição, seja com
              doações ou compras, ajuda a transformar vidas e levar esperança a quem mais precisa. Participe e faça parte dessa história!
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="assets/img/missionario.png"
              alt="Missionário pregando"
              className="rounded-xl w-1/2 md:w-40 h-28 object-cover object-top shadow"
            />
            <img
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=250&fit=crop&auto=format&q=80"
              alt="Missão 2"
              className="rounded-xl w-1/2 md:w-40 h-28 object-cover shadow"
            />
          </div>
        </div>
        {/* Direita: Card objetivo */}
        <div
          className="flex-1 max-w-sm w-full rounded-2xl p-8 shadow-lg flex flex-col gap-6 text-white"
          style={{
            background: `#23202B ${pattern}`,
            backgroundBlendMode: 'overlay',
          }}
        >
          <h3 className="text-2xl font-semibold mb-2">Objetivo</h3>
          <p className="text-zinc-300 mb-4">
            Nosso objetivo é arrecadar fundos para ampliar o alcance das nossas ações sociais e missionárias, promovendo o amor ao próximo e a
            transformação de comunidades.
          </p>
          <hr className="border-zinc-700 mb-4" />
          <div className="mb-4">
            <div className="flex items-center mb-1">
              <span className="text-xs">22.58%</span>
            </div>
            <div className="w-full h-2.5 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-2.5 bg-primary rounded-full" style={{ width: '22.58%' }} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <span className="text-lg font-bold">
              R$ 1.089.00 <span className="text-xs font-normal text-zinc-300">Doado</span>
            </span>
            <span className="text-lg font-bold">
              R$ 4.000.00 <span className="text-xs font-normal text-zinc-300">Meta</span>
            </span>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 py-3 flex items-center justify-center gap-2 text-base transition shadow-md">
            <Heart className="w-5 h-5 fill-white" />
            Doar
          </button>
        </div>
      </div>
    </section>
  );
}
