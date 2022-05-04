import { OnLockClick } from "../handlers/OnLockClick";
import { OnDeleteClick } from "../handlers/OnDeleteClick";
import { OnToggleClick } from "../handlers/OnToggleClick";
import { Action, Dispatch } from "redux";
import { Icon } from "../../../../../compLibrary/icon";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { DownIcon, UpIcon } from "../../../../../assets/icons/toogle";
import { TextResources } from "../../../../../assets/text/TextResources";
import { InspectorButton } from "../../../../../compLibrary/buttons";
import { InspectorButtonType } from "../../../../../compLibrary/buttons/inspector/InspectorButton";
import { Project } from "../../../../../models";
import { IsCreateLibraryType, IsNode } from "../../../helpers/IsType";
import { ChangeInspectorVisibilityAction, InspectorElement } from "../../../types";
import { MutableRefObject } from "react";
import { GetSelectedNode, IsAspectNode, IsBlockView } from "../../../../../helpers";
import {
  InspectorButtonRowContainer,
  InspectorButtonRowToggleTitle,
  InspectorButtonRowToggleContainer,
} from "./InspectorButtonRow.styled";

interface Props {
  project: Project;
  element: InspectorElement;
  username: string;
  open: boolean;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: (height: number) => Action;
  dispatch: Dispatch;
}

export const InspectorButtonRow = ({
  project,
  element,
  username,
  open,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  dispatch,
}: Props) => {
  const isLocked = IsCreateLibraryType(element) ? true : element?.isLocked;
  const isElementSelected = !!element;
  const deleteDisabled =
    isLocked || (IsNode(element) && IsAspectNode(element)) || (IsBlockView() && element === GetSelectedNode());

  let inspectorToggleText = open ? TextResources.INSPECTOR_CLOSE : TextResources.INSPECTOR_EXPAND;
  if (!isElementSelected) inspectorToggleText = TextResources.INSPECTOR_INACTIVE_PANEL;

  return (
    <InspectorButtonRowContainer>
      {!IsCreateLibraryType(element) && isElementSelected && (
        <>
          <InspectorButton
            onClick={() => OnLockClick(element, !element.isLocked, username, dispatch)}
            type={element?.isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            description={element?.isLocked ? TextResources.INSPECTOR_UNLOCK_OBJECT : TextResources.INSPECTOR_LOCK_OBJECT}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && OnDeleteClick(project, element, dispatch, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            description={TextResources.INSPECTOR_DELETE_OBJECT}
            disabled={deleteDisabled}
          />
        </>
      )}
      <Tooltip content={inspectorToggleText}>
        <span tabIndex={isElementSelected ? -1 : 0}>
          <InspectorButtonRowToggleContainer
            disabled={!isElementSelected}
            onClick={() =>
              OnToggleClick(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)
            }
          >
            <InspectorButtonRowToggleTitle>{TextResources.MODULE_INSPECTOR}</InspectorButtonRowToggleTitle>
            <Icon size={15} src={open ? DownIcon : UpIcon} alt="toggle-icon" />
          </InspectorButtonRowToggleContainer>
        </span>
      </Tooltip>
    </InspectorButtonRowContainer>
  );
};
