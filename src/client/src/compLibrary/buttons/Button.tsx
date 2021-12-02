import { ButtonContainer } from "./styled";
interface Props {
  onClick: () => void;
  text: string;
  icon?: string;
  iconOnLeft?: boolean;
}

/**
 * Component for a generic button in Mimir.
 * @param interface
 * @returns a button with text and an optional icon.
 */
const Button = ({ onClick, text, icon = null, iconOnLeft = false }: Props) => (
  <ButtonContainer onClick={() => onClick()} icon={icon !== null}>
    {iconOnLeft && <img src={icon} alt="icon" />}
    <div className="button-text">{text}</div>
    {icon && !iconOnLeft && <img src={icon} alt="icon" />}
  </ButtonContainer>
);

export default Button;
