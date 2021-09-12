import { ButtonContainer } from ".";
import { GetButtonText, GetButtonIcon } from "./";

/* Component for buttons. 
The component takes two props: one handle function, and the button type
Button returns a button with an icon and text to be used in Mimir */

const Button = ({ onClick, type }) => (
  <ButtonContainer onClick={() => onClick()}>
    <img src={GetButtonIcon(type)} alt={GetButtonIcon(type)} />
    <div className="text">{GetButtonText(type)}</div>
  </ButtonContainer>
);

export default Button;
