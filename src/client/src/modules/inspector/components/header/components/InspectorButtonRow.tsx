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
import { Node, Edge } from "../../../../../models";
import { IsCreateLibraryType, IsNode } from "../../../helpers/IsType";
import { ChangeInspectorVisibilityAction, InspectorElement } from "../../../types";
import { MutableRefObject } from "react";
import { IsBlockView } from "../../../../../helpers";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import {
  InspectorButtonRowContainer,
  InspectorButtonRowToggleTitle,
  InspectorButtonRowToggleContainer,
} from "./InspectorButtonRow.styled";

interface Props {
  nodes: Node[];
  edges: Edge[];
  element: InspectorElement;
  username: string;
  open: boolean;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: (height: number) => Action;
  dispatch: Dispatch;
}

export const InspectorButtonRow = ({
  nodes,
  edges,
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
  const selectedNode = nodes?.find((n) => n.selected);
  const deleteDisabled = isLocked || (IsNode(element) && IsAspectNode(element)) || (IsBlockView() && element === selectedNode);

  let inspectorToggleText = open ? TextResources.CLOSE : TextResources.EXPAND;
  if (!isElementSelected) inspectorToggleText = TextResources.INACTIVE_PANEL;

  return (
    <InspectorButtonRowContainer>
      {!IsCreateLibraryType(element) && isElementSelected && (
        <>
          <InspectorButton
            onClick={() => OnLockClick(element, !element.isLocked, username, dispatch)}
            type={element?.isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            description={element?.isLocked ? TextResources.UNLOCK_OBJECT : TextResources.LOCK_OBJECT}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && OnDeleteClick(nodes, edges, element, dispatch, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            description={TextResources.DELETE_OBJECT}
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
            <InspectorButtonRowToggleTitle>{TextResources.INSPECTOR}</InspectorButtonRowToggleTitle>
            <Icon size={15} src={open ? DownIcon : UpIcon} alt="toggle-icon" />
          </InspectorButtonRowToggleContainer>
        </span>
      </Tooltip>
    </InspectorButtonRowContainer>
  );
};
