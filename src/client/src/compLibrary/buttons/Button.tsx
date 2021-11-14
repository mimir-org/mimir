import { ButtonContainer } from "./styled";
import { GetButtonIcon } from "./helpers";

interface Props {
  onClick: () => void;
  type: string;
}

/**
 * Component for a generic button.
 * @param params
 * @returns a button with an icon and text to be used in Mimir.
 */
const Button = ({ onClick, type }: Props) => (
  <ButtonContainer onClick={() => onClick()}>
    <img src={GetButtonIcon(type)} alt={type} />
    <div className="text">{type}</div>
  </ButtonContainer>
);

export default Button;
