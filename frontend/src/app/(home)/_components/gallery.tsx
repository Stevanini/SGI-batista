'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
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
  };

  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Galeria</h2>
        <Slider {...settings}>
          {slides.map((group, idx) => (
            <div key={idx}>
              <div className="flex gap-6 justify-center">
                {group.map((url, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-6">
                    <div className="rounded-xl overflow-hidden shadow bg-white" style={{ width: 220, height: 180 }}>
                      <img
                        src={url}
                        alt={`Galeria ${idx * columns + colIdx + 1}`}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
