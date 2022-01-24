import { ReactElement } from "react";
import { InspectorButtonType } from "../InspectorButton";
import { LockClosedComponent, LockOpenComponent } from "../../../../assets/icons/lock";
import { CheckmarkCheckedComponent, CheckmarkEmptyComponent } from "../../../../assets/icons/checkmark";
import { DeleteActiveIconComponent, DeleteDisabledIconComponent, DeleteIconComponent } from "../../../../assets/icons/delete";

export const GetButtonIcon = (type: InspectorButtonType): ReactElement => {
  switch (type) {
    case InspectorButtonType.Validate:
      return <CheckmarkEmptyComponent />;
    case InspectorButtonType.ValidateCorrect:
      return <CheckmarkCheckedComponent />;
    case InspectorButtonType.Lock:
      return <LockOpenComponent />;
    case InspectorButtonType.Unlock:
      return <LockClosedComponent />;
    case InspectorButtonType.Delete:
      return <DeleteIconComponent />;
    case InspectorButtonType.DeleteDisabled:
      return <DeleteDisabledIconComponent />;
  }
};

export const GetActiveButtonIcon = (type: InspectorButtonType) => {
  if (type === InspectorButtonType.Delete) return <DeleteActiveIconComponent />;
  else return GetButtonIcon(type);
};
