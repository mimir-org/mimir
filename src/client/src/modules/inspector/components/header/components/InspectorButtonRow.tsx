import { OnLockClick } from "../handlers/OnLockClick";
import { OnInspectorDeleteClick } from "../handlers/OnInspectorDeleteClick";
import { OnToggleInspectorClick } from "../handlers/OnToggleInspectorClick";
import { Action, Dispatch } from "redux";
import { Icon } from "../../../../../compLibrary/icon/Icon";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { DownIcon, UpIcon } from "../../../../../assets/icons/toogle";
import { TextResources } from "../../../../../assets/text/TextResources";
import { InspectorButton, InspectorButtonType } from "../../../../../compLibrary/buttons/inspector/";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsNode } from "../../../helpers/IsType";
import { ChangeInspectorVisibilityAction, InspectorElement } from "../../../types";
import { MutableRefObject, useEffect, useState } from "react";
import { IsBlockView } from "../../../../../helpers";
import { isProjectStateGloballyLockingSelector, useAppSelector } from "../../../../../redux/store";
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
  tabsVisible: boolean;
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
  tabsVisible,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  dispatch,
}: Props) => {
  const [onLock, setOnLock] = useState(false);
  const isLocked = element?.isLocked;
  const isElementSelected = !!element;
  const selectedBlockNode = nodes?.find((n) => n.blockSelected);

  const deleteDisabled =
    isLocked || (IsNode(element) && IsAspectNode(element)) || (IsBlockView() && element?.id === selectedBlockNode?.id);

  const isGlobalLocking = useAppSelector(isProjectStateGloballyLockingSelector);

  let inspectorToggleText = open ? TextResources.CLOSE : TextResources.EXPAND;
  if (!isElementSelected) inspectorToggleText = TextResources.INACTIVE_PANEL;

  useEffect(() => {
    if (!isGlobalLocking && onLock) setOnLock(false);
  }, [isGlobalLocking, onLock]);

  return (
    <InspectorButtonRowContainer>
      {isElementSelected && (
        <>
          <InspectorButton
            onClick={() => OnLockClick(element, !element.isLocked, username, setOnLock, dispatch)}
            type={element?.isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            description={element?.isLocked ? TextResources.UNLOCK_OBJECT : TextResources.LOCK_OBJECT}
            disabled={onLock && isGlobalLocking}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && OnInspectorDeleteClick(nodes, edges, element, dispatch, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            description={TextResources.DELETE_OBJECT}
            disabled={deleteDisabled}
          />
        </>
      )}
      <Tooltip content={inspectorToggleText}>
        <span tabIndex={isElementSelected ? -1 : 0}>
          <InspectorButtonRowToggleContainer
            disabled={!isElementSelected || !tabsVisible}
            onClick={() =>
              OnToggleInspectorClick(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)
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
