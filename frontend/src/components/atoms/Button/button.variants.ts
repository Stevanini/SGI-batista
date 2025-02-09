import { tv } from 'tailwind-variants';

export const v_button = tv({
  base: 'rounded-md p-2 px-4 flex items-center gap-2',
  variants: {
    color: {
      primary: 'text-zinc-50 bg-red-500 outline-red-700',
    },
    size: {
      xs: 'text-xs h-9',
      sm: 'text-sm h-10',
      md: 'text-md h-12',
      lg: 'text-lg h-14',
    },
    bold: {
      true: 'font-bold',
      false: 'font-normal',
    },
  },
  defaultVariants: { color: 'primary', size: 'xs', bold: true },
});

export const v_button_icon = tv({
  base: 'text-white mb-px',
  variants: {
    size: {
      '2xs': 'w-4 h-4  min-h-4 min-w-4',
      xs: 'w-5 h-5  min-h-5 min-w-5',
      sm: 'w-6 h-6  min-h-6 min-w-6',
      md: 'w-8 h-8  min-h-8 min-w-8',
      lg: 'w-10 h-10  min-h-10 min-w-10',
    },
  },
  defaultVariants: { size: 'xs' },
});
