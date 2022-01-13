import * as Click from "./handlers";
import { Action, Dispatch } from "redux";
import { DownIcon, UpIcon } from "../../assets/icons/toogle";
import { TextResources } from "../../assets/text";
import { InspectorButton } from "../../compLibrary/buttons";
import { InspectorButtonType } from "../../compLibrary/buttons/inspector/InspectorButton";
import { Project } from "../../models";
import { IsCreateLibraryType, IsNode } from "./helpers/IsType";
import { ButtonWrapper, Title, ToggleBox } from "./styled";
import { ChangeInspectorVisibilityAction, InspectorElement, OnToogleHandler } from "./types";
import { useState } from "react";
import { GetSelectedNode, IsAspectNode, IsBlockView } from "../../helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  username: string;
  open: boolean;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
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
              visible={true}
            />
          )}
          <InspectorButton
            onClick={() => Click.OnLock(element, project, !element.isLocked, username, dispatch)}
            type={element?.isLocked ? InspectorButtonType.Unlock : InspectorButtonType.Lock}
            visible={true}
          />
          <InspectorButton
            onClick={() => !deleteDisabled && Click.OnDelete(project, element, dispatch, inspectorRef)}
            type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
            visible={true}
            disabled={deleteDisabled}
          />
        </>
      )}
      <Title onClick={() => onToggle(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)}>
        {TextResources.Module_Inspector}
      </Title>
      <ToggleBox>
        <img
          src={open ? DownIcon : UpIcon}
          alt="toggle-icon"
          onClick={() => onToggle(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)}
        />
      </ToggleBox>
    </ButtonWrapper>
  );
};

export default InspectorButtonRow;
