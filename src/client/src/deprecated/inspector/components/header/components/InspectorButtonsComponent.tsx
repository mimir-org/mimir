import { OnLockClick } from "../handlers/OnLockClick";
import { OnInspectorDeleteClick } from "../handlers/OnInspectorDeleteClick";
import { OnToggleInspectorClick } from "../handlers/OnToggleInspectorClick";
import { Action, Dispatch } from "redux";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../assets/text/TextResources";
import { InspectorButton, InspectorButtonType } from "../../../../../compLibrary/buttons/inspector";
import { ChangeInspectorVisibilityAction, InspectorElement } from "../../../types";
import { MutableRefObject, useEffect, useState } from "react";
// import { isProjectStateGloballyLockingSelector } from "../../../../../redux/store";
import { useAppSelector } from "store";
import {
  InspectorButtonsContainer,
  InspectorButtonsToggleTitle,
  InspectorButtonsToggleContainer,
} from "./InspectorButtonsComponent.styled";
import { Block, Connection, Project } from "lib";
import { Icon, ToogleDownIcon, ToogleUpIcon } from "@mimirorg/component-library";

interface Props {
  nodes: Block[];
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
  isBlockView: boolean;
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
  isBlockView,
}: Props) => {
  const [onLock, setOnLock] = useState(false);
  // const isLocked = element?.isLocked; TODO: resolve this
  const isLocked = false; //element?.isLocked;
  const isElementSelected = !!element;
  // const selectedBlockNode = nodes?.find((n) => n.blockSelected);
  const selectedBlockNode = nodes?.find((n) => n.blockSelected);

  const deleteDisabled =
    isLocked || (element instanceof Block && element.isRoot()) || (isBlockView && element?.id === selectedBlockNode?.id);

  const isGlobalLocking = false; //useAppSelector(isProjectStateGloballyLockingSelector);

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
            <Icon size={15} src={open ? ToogleDownIcon : ToogleUpIcon} alt="toggle-icon" />
          </InspectorButtonsToggleContainer>
        </span>
      </Tooltip>
    </InspectorButtonsContainer>
  );
};
