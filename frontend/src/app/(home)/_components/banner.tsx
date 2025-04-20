import { Carousel } from '~/components/ui/carousel';
import { images } from '~/configs/images';

export function Banner() {
  return (
    <section className="relative h-screen w-full">
      <Carousel items={images.banner} />
    </section>
  );
}
