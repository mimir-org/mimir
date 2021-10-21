import * as Click from "./handlers";
import { DownIcon, UpIcon } from "../../assets/icons/toogle";
import { TextResources } from "../../assets/text";
import { BlobData, Project } from "../../models";
import { GetInspectorColor } from "./helpers";
import { Symbol } from "../../compLibrary/symbol";
import { InspectorButton } from "../../compLibrary/buttons";
import { Menu, Title, NodeInfo, ToggleBox, ButtonWrapper } from "./styled";
import { InspectorTabs } from ".";
import { useState } from "react";
import { InspectorButtonType } from "../../compLibrary/buttons/inspector/InspectorButton";
import { IsAspectNode } from "../../components/flow/helpers";
import { AttributeLikeItem, InspectorElement } from "./types";
import { IsCreateLibraryType, IsEdge, IsNode } from "./helpers/IsType";
import { GetSelectedIcon } from "../../typeEditor/helpers";

interface Props {
  project: Project;
  element: InspectorElement;
  dispatch: any;
  open: boolean;
  type: string;
  attributeLikeItems?: AttributeLikeItem[];
  icons?: BlobData[];
}

const InspectorHeader = ({ project, element, dispatch, open, type, icons, attributeLikeItems }: Props) => {
  const [validated, setValidated] = useState(false);

  const deleteDisabled = IsNode(element) && IsAspectNode(element);

  return (
    <Menu id="InspectorHeader" color={GetInspectorColor(element)}>
      {project && <InspectorTabs project={project} element={element} attributeLikeItems={attributeLikeItems} />}

      {IsNode(element) && (
        <NodeInfo>
          <div className="symbol">
            {!IsAspectNode(element) && <Symbol base64={element?.symbol} text={element?.label ?? element?.name} />}
          </div>
          <div className="text">{element?.label ?? element?.name}</div>
        </NodeInfo>
      )}
      {IsEdge(element) && (
        <NodeInfo>
          <div className="edgetext">{element?.id}</div>
        </NodeInfo>
      )}

      {IsCreateLibraryType(element) && (
        <NodeInfo>
          <div className="symbol">{<Symbol base64={GetSelectedIcon(element, icons)?.data} text={element?.name} />}</div>
          <div className="text">{element?.name}</div>
        </NodeInfo>
      )}

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
              onClick={() => !deleteDisabled && Click.OnDelete(project, element, dispatch)}
              type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
              visible={true}
              disabled={deleteDisabled}
            />
          </>
        )}
        <Title onClick={() => Click.OnToggle(dispatch, type, open)}>{TextResources.Module_Inspector}</Title>
        <ToggleBox>
          <img src={open ? DownIcon : UpIcon} alt="toggle-icon" onClick={() => Click.OnToggle(dispatch, type, open)} />
        </ToggleBox>
      </ButtonWrapper>
    </Menu>
  );
};
export default InspectorHeader;
