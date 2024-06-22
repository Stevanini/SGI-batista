import { VariantProps } from 'tailwind-variants';

import { ElementType, HTMLAttributes } from 'react';
import { v_button, v_button_icon } from './button.variants';

export type ButtonRootProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof v_button> & {
    asChild?: boolean;
    disabled?: boolean;
  };

export type ButtonIconProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof v_button_icon> & { icon: ElementType };

export type ButtonContentProps = React.HTMLAttributes<HTMLSpanElement>;
