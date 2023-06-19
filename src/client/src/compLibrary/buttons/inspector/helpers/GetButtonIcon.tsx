import { ReactElement } from "react";
import { InspectorButtonType } from "../InspectorButton";
import { LockClosedComponent, LockOpenComponent } from "../../../../assets/icons/lock";
import { CheckmarkCheckedIcon, CheckmarkEmptyIcon, DeleteDisabledIcon, DeleteIcon } from "@mimirorg/component-library";

export const GetButtonIcon = (type: InspectorButtonType): ReactElement => {
  switch (type) {
    case InspectorButtonType.Validate:
      return <CheckmarkEmptyIcon />;
    case InspectorButtonType.ValidateCorrect:
      return <CheckmarkCheckedIcon />;
    case InspectorButtonType.Lock:
      return <LockClosedComponent />;
    case InspectorButtonType.Unlock:
      return <LockOpenComponent />;
    case InspectorButtonType.Delete:
      return <DeleteIcon />;
    case InspectorButtonType.DeleteDisabled:
      return <DeleteDisabledIcon />;
  }
};
