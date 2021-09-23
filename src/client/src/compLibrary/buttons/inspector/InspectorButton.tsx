import { ButtonContainer } from "./";
import { GetButtonText, GetButtonIcon } from "./helpers";

/* Component for inspector buttons. 
The component takes two props: one handle function, and the type of the button 
InspectorButton returns a button to be used in the Inspector Header */

interface Props {
  onClick: () => void;
  type: string;
  visible: boolean;
}

const InspectorButton = ({ onClick, type, visible }: Props) => (
  <ButtonContainer onClick={() => onClick()} visible={visible}>
    <div>{GetButtonText(type)}</div>
    <img src={GetButtonIcon(type)} alt={GetButtonText(type)} />
  </ButtonContainer>
);

export default InspectorButton;
