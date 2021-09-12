/* Component for inspector buttons. 
The component takes two props: one handle function, and the type of the button 
InspectorButton returns a button to be used in the Inspector Header */

import { ButtonContainer } from "./";
import { GetButtonText, GetButtonIcon } from "./helpers";

const InspectorButton = ({ onClick, type }) => (
  <ButtonContainer onClick={() => onClick()}>
    {GetButtonText(type)}
    <img src={GetButtonIcon(type)} alt={GetButtonText(type)} />
  </ButtonContainer>
);

export default InspectorButton;
