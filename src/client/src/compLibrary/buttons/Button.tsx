import { ButtonContainer } from "./styled";

interface Props {
  onClick: () => void;
  text: string;
  icon?: string;
  iconLeft?: boolean;
}

/**
 * Component for a generic button in Mimir.
 * @param interface
 * @returns a button with text and an optional icon.
 */
const Button = ({ onClick, text, icon = null, iconLeft = false }: Props) => (
  <ButtonContainer onClick={() => onClick()} icon={icon !== null}>
    {iconLeft && <img src={icon} alt="icon" />}
    <div className="button-text">{text}</div>
    {icon && !iconLeft && <img src={icon} alt="icon" />}
  </ButtonContainer>
);

export default Button;
