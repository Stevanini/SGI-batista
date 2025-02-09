import { HiPhone } from 'react-icons/hi';
import { IoBagHandle } from 'react-icons/io5';
import { PiHandHeartDuotone } from 'react-icons/pi';
import { Widget } from '~/components/atoms/Widget';

export const Information: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-lg flex flex-wrap flex-col w-4/5 max-w-[1210px] mx-auto md:flex-row">
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
  );
};
