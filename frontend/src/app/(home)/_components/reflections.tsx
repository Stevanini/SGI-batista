'use client';

import { Quote } from 'lucide-react';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { supabase } from '../../../services/supabaseClient';
import type { Database } from '../../../interfaces/database.types';
import styles from './Reflections.module.css';

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
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
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

  if (loading) return <div>Carregando reflexões...</div>;
  if (error) return <div>Erro ao carregar reflexões: {error}</div>;
  if (!reflections.length) return <div>Nenhuma reflexão encontrada.</div>;

  return (
    <section className="w-full py-16 bg-[#FCFAF6]">
      <div id="reflections" className="container-1560 px-4 md:px-8">
        <span className="block text-center text-2xl mb-2" style={{ color: '#FF7A1A', fontFamily: 'Shadows Into Light, cursive' }}>
          Batista Renovada
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Reflexões</h2>
        <Slider {...settings}>
          {reflections.map((item) => (
            <div key={item.id} className="px-2 py-4">
              <div className={`bg-white rounded-2xl shadow-lg flex flex-col items-center px-8 py-8 min-h-[340px] ${styles['reflection-card']}`}>
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
