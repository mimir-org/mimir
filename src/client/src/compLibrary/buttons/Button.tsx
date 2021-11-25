import { ButtonContainer } from "./styled";
import { GetButtonIcon } from "./helpers";

interface Props {
  onClick: () => void;
  type: string;
}

/**
 * Component for a generic button in Mimir.
 * @param interface
 * @returns a button with an icon and text.
 */
const Button = ({ onClick, type }: Props) => (
  <ButtonContainer onClick={() => onClick()}>
    <img src={GetButtonIcon(type)} alt={type} />
    <div className="button-text">{type}</div>
  </ButtonContainer>
);

export default Button;
