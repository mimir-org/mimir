import { ButtonBase, GreyButton, WhiteButton } from "./Button.styled";
import { Icon } from "../icon";

interface Props {
  onClick: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
  variant?: ButtonVariantType;
}

type ButtonVariantType = typeof GreyButton | typeof WhiteButton;
export const ButtonVariant = { GreyButton, WhiteButton };

/**
 * Component for a generic button in Mimir.
 * @param interface
 * @returns a button with text and an optional icon.
 */
export const Button = ({ onClick, text, icon = null, disabled, variant = ButtonVariant.GreyButton }: Props) => (
  <ButtonBase as={variant} disabled={disabled} onClick={() => onClick()}>
    <span>{text}</span>
    {icon && <Icon size={15} src={icon} alt="" />}
  </ButtonBase>
);
