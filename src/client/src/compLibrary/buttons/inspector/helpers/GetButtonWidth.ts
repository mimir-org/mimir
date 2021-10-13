import { InspectorButtonType } from "../InspectorButton";

export const GetButtonWidth = (type: InspectorButtonType): number => {
  switch (type) {
    case InspectorButtonType.Validate:
    case InspectorButtonType.ValidateCorrect:
      return 79;
    case InspectorButtonType.Lock:
    case InspectorButtonType.Unlock:
      return 62;
    case InspectorButtonType.Delete:
    case InspectorButtonType.DeleteDisabled:
      return 66;
  }
};
