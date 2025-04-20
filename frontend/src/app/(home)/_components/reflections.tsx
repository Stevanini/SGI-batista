'use client';

import { Quote } from 'lucide-react';
import Slider from 'react-slick';

const testimonials = [
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Pr. Divan',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Pr. Divan',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    author: 'Pr. Divan',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
];

export function Reflections() {
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

  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <span className="block text-center text-lg mb-2" style={{ color: '#FF7A1A', fontFamily: 'Shadows Into Light, cursive' }}>
          Batista Renovada
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-10 text-center font-serif">Reflexões</h2>
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            <div key={idx} className="px-2 py-4">
              <div className="bg-white rounded-2xl shadow-lg flex flex-col items-center px-8 py-8 min-h-[340px]">
                <div className="flex flex-col items-center mb-4">
                  <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-4">
                    <Quote className="w-6 h-6 text-white" />
                  </span>
                  <p className="text-zinc-400 text-center mb-6">{item.text}</p>
                  <span className="block text-primary text-base mb-2" style={{ fontFamily: 'Shadows Into Light, cursive' }}>
                    {item.author}
                  </span>
                  <img src={item.avatar} alt={item.author} className="w-14 h-14 rounded-full object-cover border-4 border-white shadow -mb-8" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
