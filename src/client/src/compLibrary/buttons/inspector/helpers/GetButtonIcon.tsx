import { ReactElement } from "react";
import { InspectorButtonType } from "../InspectorButton";
import { LockClosedComponent, LockOpenComponent } from "../../../../assets/icons/lock";
import { CheckmarkCheckedComponent, CheckmarkEmptyComponent } from "../../../../assets/icons/checkmark";
import { DeleteDisabledIconComponent, DeleteIconComponent } from "../../../../assets/icons/delete";

export const GetButtonIcon = (type: InspectorButtonType): ReactElement => {
  switch (type) {
    case InspectorButtonType.Validate:
      return <CheckmarkEmptyComponent />;
    case InspectorButtonType.ValidateCorrect:
      return <CheckmarkCheckedComponent />;
    case InspectorButtonType.Lock:
      return <LockClosedComponent />;
    case InspectorButtonType.Unlock:
      return <LockOpenComponent />;
    case InspectorButtonType.Delete:
      return <DeleteIconComponent />;
    case InspectorButtonType.DeleteDisabled:
      return <DeleteDisabledIconComponent />;
  }
};
