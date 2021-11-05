import { Action, Dispatch } from "redux";
import * as Click from "./handlers";
import { DownIcon, UpIcon } from "../../assets/icons/toogle";
import { TextResources } from "../../assets/text";
import { InspectorButton } from "../../compLibrary/buttons";
import { InspectorButtonType } from "../../compLibrary/buttons/inspector/InspectorButton";
import { Project } from "../../models";
import { IsCreateLibraryType, IsNode } from "./helpers/IsType";
import { ButtonWrapper, Title, ToggleBox } from "./styled";
import { InspectorElement } from "./types";
import { useState } from "react";
import { IsBlockView, IsAspectNode } from "../../helpers";
import { GetSelectedNode } from "../../components/flow/helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  open: boolean;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: (visibility: boolean) => Action;
  changeInspectorHeightAction: (height: number) => Action;
  onToggle?: Function;
  dispatch: Dispatch;
}

const InspectorButtonRow = ({
  project,
  element,
  open,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  onToggle = Click.OnToggle,
  dispatch,
}: Props) => {
  const [validated, setValidated] = useState(false);
  const deleteDisabled = IsNode(element) && (IsAspectNode(element) || (IsBlockView() && element === GetSelectedNode()));
  return (
    <ButtonWrapper visible={!!element}>
      {!IsCreateLibraryType(element) && (
        <>
          <InspectorButton
            onClick={() => setValidated(!validated)}
            type={validated ? InspectorButtonType.ValidateCorrect : InspectorButtonType.Validate}
            visible={true}
          />
          <InspectorButton
            onClick={() => Click.OnLock(element, project, !element.isLocked, dispatch)}
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
