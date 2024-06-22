import { animate, motion, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import { TESTS_IDS } from './number-animated.constants';
import { AnimatedNumbersProps } from './numbers-animated.types';

export const AnimatedNumbersRoot: React.FC<AnimatedNumbersProps> = ({ to, from, onFormat, duration = 1.5, ...props }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(to, from, {
      duration: duration,
      ease: 'easeInOut',
      onUpdate(value) {
        node.textContent = onFormat ? onFormat(value) : value.toFixed(0);
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, from]);

  return <motion.span ref={nodeRef} data-testid={TESTS_IDS.ROOT} {...props} />;
};
