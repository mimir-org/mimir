import { ButtonContainer } from "./styled";
import { GetButtonText, GetButtonIcon } from "./helpers";

interface Props {
  onClick: () => void;
  type: string;
  visible: boolean;
}
/**
 * Component for buttons in the Inspector Module.
 * @param param0
 * @returns a button to be used in the Inspector Header.
 */
const InspectorButton = ({ onClick, type, visible }: Props) => (
  <ButtonContainer onClick={() => onClick()} visible={visible}>
    <div>{GetButtonText(type)}</div>
    <img src={GetButtonIcon(type)} alt={GetButtonText(type)} />
  </ButtonContainer>
);

export default InspectorButton;
