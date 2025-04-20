'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './carousel-custom.css';

interface CarouselProps {
  items: ReadonlyArray<{
    readonly url: string;
    readonly title: string;
    readonly description: string;
  }>;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="slick-arrow-custom slick-arrow-custom-right" onClick={onClick} aria-label="Próximo" type="button">
      <ChevronRight className="w-7 h-7 text-white" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="slick-arrow-custom slick-arrow-custom-left" onClick={onClick} aria-label="Anterior" type="button">
      <ChevronLeft className="w-7 h-7 text-white" />
    </button>
  );
}

export function Carousel({ items }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    pauseOnHover: true,
    adaptiveHeight: true,
    fade: false,
    cssEase: 'ease-in-out',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      >
        <ul className="slick-dots-custom" style={{ pointerEvents: 'auto' }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => <span className="slick-dot-custom-white" />,
  };

  return (
    <div className="relative h-screen w-full">
      <Slider {...settings} className="h-full">
        {items.map((item, idx) => (
          <div key={idx} className="relative h-screen w-full">
            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/70 z-10" />
            {/* Imagem de fundo */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${item.url}')` }} />
            {/* Conteúdo */}
            <div className="relative z-20 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
              <h1 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg">{item.title}</h1>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 drop-shadow">{item.description}</p>
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg transition-colors shadow-lg">
                Saiba Mais
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
