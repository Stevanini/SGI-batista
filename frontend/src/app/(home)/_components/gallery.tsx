'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '~/components/ui/carousel-custom.css';
import { images } from '~/configs/images';

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const results = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    results.push(arr.slice(i, i + chunkSize));
  }
  return results;
}

function getColumnsByWidth(width: number) {
  if (width >= 1536) return 5; // 2xl
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 640) return 2; // sm/md
  return 1; // mobile
}

export const Gallery: React.FC = () => {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    function handleResize() {
      setColumns(getColumnsByWidth(window.innerWidth));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = chunkArray([...images.gallery], columns);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'relative', bottom: -32, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 30 }}>
        <ul className="slick-dots-custom">{dots}</ul>
      </div>
    ),
    customPaging: () => <span className="slick-dot-custom-black" />,
  };

  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div id="gallery" className="container-1560 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Galeria</h2>
        <Slider {...settings}>
          {slides.map((group, idx) => (
            <div key={idx} className="px-2 md:px-2">
              <div className="flex gap-4 justify-center">
                {group.map((url, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-4 flex-1">
                    <div className="rounded-xl overflow-hidden shadow bg-white w-full" style={{ aspectRatio: '11/9' }}>
                      <img
                        src={url}
                        alt={`Galeria ${idx * columns + colIdx + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
                {/* Preencher com placeholders invisíveis se faltar colunas */}
                {Array.from({ length: columns - group.length }).map((_, i) => (
                  <div key={`placeholder-${i}`} className="flex-1" />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
