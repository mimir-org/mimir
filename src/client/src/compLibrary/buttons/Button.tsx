import { ButtonContainer } from "./styled";
import { Icon } from "../icon";

interface Props {
  onClick: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}

/**
 * Component for a generic button in Mimir.
 * @param interface
 * @returns a button with text and an optional icon.
 */
const Button = ({ onClick, text, icon = null, disabled = false }: Props) => (
  <ButtonContainer disabled={disabled} onClick={() => onClick()} icon={icon !== null}>
    <span>{text}</span>
    {icon && <Icon size={15} src={icon} alt="" />}
  </ButtonContainer>
);

export default Button;
