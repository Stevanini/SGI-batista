import { clsx } from 'clsx';

import { TESTS_IDS } from './button.constants';
import { ButtonContentProps } from './button.types';

export const ButtonContent: React.FC<ButtonContentProps> = ({ children, className, ...props }) => {
  return (
    <span className={clsx('select-none', className)} data-testid={TESTS_IDS.CONTENT} {...props}>
      {children}
    </span>
  );
};
