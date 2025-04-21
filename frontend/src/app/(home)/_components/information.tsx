import { HiPhone } from 'react-icons/hi';
import { IoBagHandle } from 'react-icons/io5';
import { PiHandHeartDuotone } from 'react-icons/pi';
import { Widget } from '~/components/atoms/Widget';

export const Information: React.FC = () => {
  return (
    <section className="container-1560 px-4 md:px-8 relative z-20 -mt-16">
      <div className="bg-white shadow-lg rounded-xl w-full p-4 flex flex-wrap flex-col md:flex-row">
        <div className="p-4 flex gap-4 flex-col flex-1">
          <Widget icon={PiHandHeartDuotone} color="orange" description="Missões" />

          <p className="text-zinc-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>

        <div className="p-4 flex gap-4 flex-col flex-1">
          <Widget icon={IoBagHandle} color="blue" description="Bazar Missionário" />

          <p className="text-zinc-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>

        <div className="p-4 flex gap-4 flex-col flex-1">
          <Widget icon={HiPhone} color="green" description="Fale Conosco" />

          <p className="text-zinc-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
    </section>
  );
};
