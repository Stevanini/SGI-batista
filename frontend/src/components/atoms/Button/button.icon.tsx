import { TESTS_IDS } from './button.constants';
import { ButtonIconProps } from './button.types';
import { v_button_icon } from './button.variants';

export const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon, size, className, ...props }) => {
  return <Icon className={v_button_icon({ size, className })} data-testid={TESTS_IDS.ICON} {...props} />;
};
