'use client';

import { Quote } from 'lucide-react';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import type { Database } from '../../../interfaces/database.types';
import styles from './Reflections.module.css';

function ReflectionsSkeleton() {
  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div className="container-1560 px-4 md:px-8">
        <div className="h-10 w-48 bg-zinc-200 rounded mb-10 mx-auto animate-pulse" />
        <div className="flex gap-4 justify-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg flex flex-col items-center px-8 py-8 min-h-[340px] w-80 max-w-xs animate-pulse">
              <div className="w-10 h-10 rounded-full bg-zinc-200 mb-4" />
              <div className="h-6 w-32 bg-zinc-200 rounded mb-2" />
              <div className="h-4 w-40 bg-zinc-200 rounded mb-2" />
              <div className="h-4 w-24 bg-zinc-200 rounded mb-2" />
              <div className="h-14 w-14 rounded-full bg-zinc-200 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reflections() {
  const [reflections, setReflections] = useState<Database['public']['Tables']['reflexoes']['Row'][]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('reflexoes')
      .select('*')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        if (data) setReflections(data);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: Math.min(3, reflections.length),
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(2, reflections.length) },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div style={{ position: 'relative', bottom: '0', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 30 }}>
        <ul className="slick-dots-custom">{dots}</ul>
      </div>
    ),
    customPaging: () => <span className="slick-dot-custom-black" />,
  };

  if (loading) return <ReflectionsSkeleton />;
  if (!reflections.length) return null;

  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div id="reflections" className="container-1560 px-4 md:px-8">
        <span className="block text-center text-2xl mb-2 text-primary" style={{ fontFamily: 'Shadows Into Light, cursive' }}>
          Batista Renovada
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Reflexões</h2>
        <Slider {...settings}>
          {reflections.map((item) => (
            <div key={item.id} className="px-2 py-4">
              <div className={`bg-white rounded-2xl shadow-lg flex flex-col items-center px-8 py-8 min-h-[340px] max-w-[500px] ${styles['reflection-card']}`}>
                <div className="flex flex-col items-center justify-between flex-1 mb-4">
                  <div className='flex flex-col items-center justify-center'>
                    <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4">
                      <Quote className="w-6 h-6 text-white" />
                    </span>

                    <p className={`text-zinc-400 text-center mb-6 ${styles['reflection-text-ellipsis']}`}>{item.text}</p>
                  </div>

                  <div>
                    <span className="block text-primary text-base mb-2" style={{ fontFamily: 'Shadows Into Light, cursive' }}>
                      {item.author_name}
                    </span>
                    <img
                      src={item.author_image_url}
                      alt={item.author_name}
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow -mb-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
