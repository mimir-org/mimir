import { OnLockClick } from "../handlers/OnLockClick";
import { OnInspectorDeleteClick } from "../handlers/OnInspectorDeleteClick";
import { OnToggleInspectorClick } from "../handlers/OnToggleInspectorClick";
import { Action, Dispatch } from "redux";
import { Icon } from "../../../../../compLibrary/icon/Icon";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { DownIcon, UpIcon } from "../../../../../assets/icons/toogle";
import { TextResources } from "../../../../../assets/text/TextResources";
import { InspectorButton, InspectorButtonType } from "../../../../../compLibrary/buttons/inspector";
import { ChangeInspectorVisibilityAction, InspectorElement } from "../../../types";
import { MutableRefObject, useEffect, useState } from "react";
import { IsBlockView } from "../../../../../helpers";
import { isProjectStateGloballyLockingSelector, useAppSelector } from "../../../../../redux/store";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import {
  InspectorButtonsContainer,
  InspectorButtonsToggleTitle,
  InspectorButtonsToggleContainer,
} from "./InspectorButtonsComponent.styled";
import { AspectObject, Connection, Project } from "lib";

interface Props {
  nodes: AspectObject[];
  edges: Connection[];
  element: InspectorElement;
  username: string;
  open: boolean;
  tabsVisible: boolean;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: (height: number) => Action;
  project: Project;
  dispatch: Dispatch;
}

/**
 * Component for the buttons in the Inspector Header.
 * @param props
 * @returns a container for the row of buttons.
 */
export const InspectorButtonsComponent = ({
  nodes,
  edges,
  element,
  username,
  open,
  tabsVisible,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  project,
  dispatch,
}: Props) => {
  const [onLock, setOnLock] = useState(false);
  // const isLocked = element?.isLocked; TODO: resolve this
  const isLocked = false; //element?.isLocked;
  const isElementSelected = !!element;
  // const selectedBlockNode = nodes?.find((n) => n.blockSelected);
  const selectedBlockNode = nodes?.find((n) => n.blockSelected);

  const deleteDisabled =
    isLocked ||
    (element instanceof AspectObject && IsAspectNode(element)) ||
    (IsBlockView() && element?.id === selectedBlockNode?.id);

  const isGlobalLocking = useAppSelector(isProjectStateGloballyLockingSelector);

  let inspectorToggleText = open ? TextResources.CLOSE : TextResources.EXPAND;
  if (!isElementSelected) inspectorToggleText = TextResources.INACTIVE_PANEL;

  useEffect(() => {
    if (!isGlobalLocking && onLock) setOnLock(false);
  }, [isGlobalLocking, onLock]);

  return (
    <InspectorButtonsContainer>
      {isElementSelected && (
        <>
          <InspectorButton
            onClick={() => OnLockClick(element, !isLocked, username, setOnLock, dispatch)}
            type={isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            description={isLocked ? TextResources.UNLOCK_OBJECT : TextResources.LOCK_OBJECT}
            disabled={onLock && isGlobalLocking}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && OnInspectorDeleteClick(nodes, edges, element, dispatch, project, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            description={TextResources.DELETE_OBJECT}
            disabled={deleteDisabled}
          />
        </>
      )}
      <Tooltip content={inspectorToggleText}>
        <span tabIndex={isElementSelected ? -1 : 0}>
          <InspectorButtonsToggleContainer
            disabled={!isElementSelected || !tabsVisible}
            onClick={() =>
              OnToggleInspectorClick(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)
            }
          >
            <InspectorButtonsToggleTitle>{TextResources.INSPECTOR}</InspectorButtonsToggleTitle>
            <Icon size={15} src={open ? DownIcon : UpIcon} alt="toggle-icon" />
          </InspectorButtonsToggleContainer>
        </span>
      </Tooltip>
    </InspectorButtonsContainer>
  );
};
