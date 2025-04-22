'use client';
import { useEffect, useState } from 'react';
import { supabase } from '~/services/supabaseClient';
import { Carousel } from '~/components/ui/carousel';
import { images } from '~/configs/images';

export function Banner() {
  const [banners, setBanners] = useState<Array<{ url: string; title: string; description: string }>>([images.banner[0]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      const { data } = await supabase.from('banner_images').select('image_url, title, description').order('created_at', { ascending: false });
      const supabaseBanners = (data || []).map((b) => ({
        url: b.image_url,
        title: b.title,
        description: b.description,
      }));
      setBanners((prevState) => [...prevState, ...supabaseBanners]);
      setLoading(false);
    }
    fetchBanners();
  }, []);


  return (
    <section className="relative h-screen w-full">
      <Carousel items={banners} />
    </section>
  );
}
