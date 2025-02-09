import { IoHeart } from 'react-icons/io5';
import { Button } from '~/components/atoms/Button';
import { AnimatedNumbers } from '~/components/atoms/NumbersAnimated';

export const Mission: React.FC = () => {
  return (
    <section>
      Mission
      <Button.Root>
        <Button.Icon icon={IoHeart} />
        <Button.Content>Click me</Button.Content>
      </Button.Root>
      <div className="text-red-500 text-4xl">
        <AnimatedNumbers.Root from={500} to={100} />
      </div>
    </section>
  );
};
