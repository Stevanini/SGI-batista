'use client';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '~/components/ui/carousel-custom.css';
import { supabase } from '~/services/supabaseClient';

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

function GallerySkeleton() {
  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div className="container-1560 px-4 md:px-8">
        <div className="h-10 w-48 bg-zinc-200 rounded mb-10 mx-auto animate-pulse" />
        <div className="flex gap-4 justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 flex-1 max-w-xs">
              <div className="rounded-xl overflow-hidden shadow bg-zinc-200 w-full h-60 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Gallery: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const { data, error } = await supabase.from('galeria').select('image_url').order('created_at', { ascending: false });
      if (error) {
        setError('Erro ao carregar galeria');
        setGalleryImages([]);
      } else {
        setGalleryImages((data || []).map((img) => img.image_url));
      }
      setLoading(false);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    function handleResize() {
      setColumns(getColumnsByWidth(window.innerWidth));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = chunkArray(galleryImages, columns);

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

  if (loading) return <GallerySkeleton />;
  if (error || !galleryImages.length) return null;

  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div id="gallery" className="container-1560 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Galeria</h2>
        <Slider {...settings}>
          {slides.map((group, idx) => (
            <div key={idx} className="px-2 md:px-2">
              <div className="flex gap-4 justify-center">
                {group.map((url, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-4 flex-1 max-w-xs">
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
                {Array.from({ length: columns - group.length }).map((_, i) => (
                  <div key={`placeholder-${i}`} className="flex-1 max-w-xs" />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
