export function Offers() {
  return (
    <section className="relative w-full h-[320px] md:h-[380px] flex items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80)' }}
      />
      {/* Overlay vermelho escuro */}
      <div className="absolute inset-0 bg-[#4A0404]/80" />
      {/* Gradiente com blur no topo */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-[#4A0404]/90 to-transparent backdrop-blur-sm z-20 pointer-events-none" />
      {/* Conteúdo */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contribua</h2>
        <p className="text-white text-center max-w-2xl mb-8">
          Sua oferta é um ato voluntário, um ato de amor e compromisso com a obra de Deus e a Igreja do Senhor.
        </p>
        <button className="bg-white text-red-600 font-semibold rounded-lg px-8 py-3 shadow transition">Veja todas as formas de colaborar</button>
      </div>
    </section>
  );
}
