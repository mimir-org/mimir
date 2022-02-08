import * as Click from "./handlers";
import { Action, Dispatch } from "redux";
import { Icon } from "../../compLibrary/icon";
import { Tooltip } from "../../compLibrary/tooltip/Tooltip";
import { DownIcon, UpIcon } from "../../assets/icons/toogle";
import { TextResources } from "../../assets/text";
import { InspectorButton } from "../../compLibrary/buttons";
import { InspectorButtonType } from "../../compLibrary/buttons/inspector/InspectorButton";
import { Project } from "../../models";
import { IsCreateLibraryType, IsNode } from "./helpers/IsType";
import { ButtonWrapper, Title, ToggleBox } from "./styled";
import { ChangeInspectorVisibilityAction, InspectorElement, OnToogleHandler } from "./types";
import { MutableRefObject, useState } from "react";
import { GetSelectedNode, IsAspectNode, IsBlockView } from "../../helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  username: string;
  open: boolean;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: (height: number) => Action;
  onToggle?: OnToogleHandler;
  dispatch: Dispatch;
}

const InspectorButtonRow = ({
  project,
  element,
  username,
  open,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  onToggle = Click.OnToggle,
  dispatch,
}: Props) => {
  const [validated, setValidated] = useState(false);

  const isLocked = IsCreateLibraryType(element) ? true : element?.isLocked;
  const deleteDisabled =
    isLocked || (IsNode(element) && IsAspectNode(element)) || (IsBlockView() && element === GetSelectedNode());

  return (
    <ButtonWrapper visible={!!element}>
      {!IsCreateLibraryType(element) && (
        <>
          {false && ( //TODO: Add validation button back when validation logic has been implemented.
            <InspectorButton
              onClick={() => setValidated(!validated)}
              type={validated ? InspectorButtonType.ValidateCorrect : InspectorButtonType.Validate}
            />
          )}
          <InspectorButton
            onClick={() => Click.OnLock(element, project, !element.isLocked, username, dispatch)}
            type={element?.isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            description={element?.isLocked ? TextResources.Inspector_Unlock_Object : TextResources.Inspector_Lock_Object}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && Click.OnDelete(project, element, dispatch, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            description={TextResources.Inspector_Delete_Object}
            disabled={deleteDisabled}
          />
        </>
      )}
      <Tooltip content={open ? TextResources.Inspector_Close_Panel : TextResources.Inspector_Expand_Panel}>
        <ToggleBox
          onClick={() => onToggle(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)}
        >
          <Title>{TextResources.Module_Inspector}</Title>
          <Icon size={15} src={open ? DownIcon : UpIcon} alt="toggle-icon" />
        </ToggleBox>
      </Tooltip>
    </ButtonWrapper>
  );
};

export default InspectorButtonRow;
