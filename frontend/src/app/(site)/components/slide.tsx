import Image from 'next/image';
import slide1 from '../../../assets/slide1.jpg';

export default function SitePage() {
  return <Image alt="2" src={slide1} className="w-full h-screen" />;
}
