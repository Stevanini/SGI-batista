import { MotionProps } from 'framer-motion';
import { HTMLAttributes } from 'react';

export type AnimatedNumbersProps = HTMLAttributes<HTMLSpanElement> &
  MotionProps & {
    to: number;
    from: number;
    duration?: number;
    onFormat?: (value: number) => string;
  };
