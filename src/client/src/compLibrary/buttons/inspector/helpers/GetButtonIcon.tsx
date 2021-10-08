import React, { ReactElement } from "react";
import {
  DeleteIconComponent,
  DeleteActiveIconComponent,
  LockOpenIconComponent,
  LockClosedIconComponent,
  InspectorCheckmarkEmptyIconComponent,
  InspectorCheckmarkCheckedIconComponent,
} from "../../../../assets/icons/common";
import { InspectorButtonType } from "../InspectorButton";

export const GetButtonIcon = (type: InspectorButtonType): ReactElement => {
  switch (type) {
    case InspectorButtonType.Validate:
      return <InspectorCheckmarkEmptyIconComponent />;
    case InspectorButtonType.ValidateCorrect:
      return <InspectorCheckmarkCheckedIconComponent />;
    case InspectorButtonType.Lock:
      return <LockOpenIconComponent />;
    case InspectorButtonType.Unlock:
      return <LockClosedIconComponent />;
    case InspectorButtonType.Delete:
      return <DeleteIconComponent />;
  }
};

export const GetActiveButtonIcon = (type: InspectorButtonType) => {
  if (type === InspectorButtonType.Delete) return <DeleteActiveIconComponent />;
  else return GetButtonIcon(type);
};
