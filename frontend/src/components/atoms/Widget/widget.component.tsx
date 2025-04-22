import Image from 'next/image';

import clsx from 'clsx';
import WidgetBG1 from 'public/assets/img/widget/widget-bg-1.png';
import WidgetBG2 from 'public/assets/img/widget/widget-bg-2.png';
import WidgetBG3 from 'public/assets/img/widget/widget-bg-3.png';
import { ElementType } from 'react';

interface WidgetProps {
  description: string;
  color: 'blue' | 'green' | 'orange' | 'primary';
  icon: ElementType;
}

export const Widget: React.FC<WidgetProps> = ({ color, description, icon: Icon }) => {
  const BG_IMAGES = {
    orange: WidgetBG1,
    primary: WidgetBG1,
    blue: WidgetBG2,
    green: WidgetBG3,
  };

  return (
    <div className="flex gap-3 items-center flex-row md:flex-col lg:flex-row">
      <div className="w-20 h-20 relative flex justify-center items-center group">
        <Icon
          size={25}
          className={clsx('z-10 transform scale-100 group-hover:scale-150 transition-transform duration-500 ease-in-out', {
            'text-blue-500': color === 'blue',
            'text-green-500': color === 'green',
            'text-primary': color === 'primary' || color === 'orange',
          })}
        />

        <Image src={BG_IMAGES[color]} alt="Background Categories" className="absolute z-0" />
      </div>

      <span className="font-bold">{description}</span>
    </div>
  );
};
