import { ButtonContainer } from ".";
import { GetButtonIcon } from "./";

/* Component for buttons. 
The component takes two props: one onClick function, and the button type/text
Button returns a button with an icon and text to be used in Mimir */

const Button = ({ onClick, type }) => (
  <ButtonContainer onClick={() => onClick()}>
    <img src={GetButtonIcon(type)} alt={type} />
    <div className="text">{type}</div>
  </ButtonContainer>
);

export default Button;
