import { TextResources } from "../../../../assets/text/TextResources";
import { InspectorButtonType } from "../InspectorButton";

const GetButtonText = (type: InspectorButtonType) => {
  switch (type) {
    case InspectorButtonType.Validate:
    case InspectorButtonType.ValidateCorrect:
      return TextResources.VALIDATE;
    case InspectorButtonType.Lock:
      return TextResources.INSPECTOR_LOCK;
    case InspectorButtonType.Unlock:
      return TextResources.OPEN;
    case InspectorButtonType.Delete:
    case InspectorButtonType.DeleteDisabled:
      return TextResources.DELETE;
  }
};

export default GetButtonText;
