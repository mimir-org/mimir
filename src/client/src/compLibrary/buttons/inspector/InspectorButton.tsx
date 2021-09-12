import { TextResources } from "../../../assets/text";
import { ButtonContainer } from "./";
import {
  DeleteIcon,
  LockIcon,
  ValidateIcon,
} from "../../../assets/icons/common";

/* Component for inspector buttons. 
The component takes two props: one handle function, and the type of the button */

const GetButtonText = (type: string) => {
  if (type === "delete") return TextResources.Inspector_Delete_Node;
  if (type === "filter") return TextResources.Inspector_Filter;
  if (type === "lock") return TextResources.Inspector_Lock;
  if (type === "validate") return TextResources.Inspector_Validate;
};

const GetButtonIcon = (type: string) => {
  if (type === "delete") return DeleteIcon;
  if (type === "lock") return LockIcon;
  if (type === "validate") return ValidateIcon;
};

const InspectorButton = ({ onClick, type }) => (
  <ButtonContainer onClick={() => onClick()}>
    {GetButtonText(type)}
    <img src={GetButtonIcon(type)} alt={GetButtonText(type)} />
  </ButtonContainer>
);

export default InspectorButton;
