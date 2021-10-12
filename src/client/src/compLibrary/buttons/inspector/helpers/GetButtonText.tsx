import { TextResources } from "../../../../assets/text";
import { InspectorButtonType } from "../InspectorButton";

const GetButtonText = (type: InspectorButtonType) => {
  switch (type) {
    case InspectorButtonType.Validate:
    case InspectorButtonType.ValidateCorrect:
      return TextResources.Inspector_Validate;
    case InspectorButtonType.Lock:
      return TextResources.Inspector_Lock;
    case InspectorButtonType.Unlock:
      return TextResources.Inspector_Open;
    case InspectorButtonType.Delete:
      return TextResources.Inspector_Delete_Node;
  }
};

export default GetButtonText;
