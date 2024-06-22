import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { TESTS_IDS } from './button.constants';
import { ButtonRootProps } from './button.types';
import { v_button } from './button.variants';

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(({ children, color, size, bold, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp ref={ref} className={v_button({ color, size, bold, className })} data-testid={TESTS_IDS.ROOT} {...props}>
      {children}
    </Comp>
  );
});

ButtonRoot.displayName = 'ButtonRoot';

export { ButtonRoot };
