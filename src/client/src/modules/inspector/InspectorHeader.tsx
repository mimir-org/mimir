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
import { GetSelectedNode, IsAspectNode } from "../../components/flow/helpers";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { IsCreateLibraryType, IsEdge, IsNode } from "./helpers/IsType";
import { GetSelectedIcon } from "../../typeEditor/helpers";
import { Action, Dispatch } from "redux";

interface Props {
  project: Project;
  element: InspectorElement;
  dispatch: Dispatch;
  open: boolean;
  activeTabIndex: number;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  changeInspectorVisibilityAction: (visibility: boolean) => Action;
  changeInspectorHeightAction: (height: number) => Action;
  changeInspectorTabAction?: (index: number) => Action;
  onToggle?: Function;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
  icons?: BlobData[];
}

const InspectorHeader = ({
  project,
  element,
  dispatch,
  open,
  activeTabIndex,
  inspectorRef,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  changeInspectorTabAction,
  onToggle = Click.OnToggle,
  icons,
  attributeLikeItems,
  terminalLikeItems,
  compositeLikeItems,
}: Props) => {
  const [validated, setValidated] = useState(false);
  const selectedNode = GetSelectedNode();
  const deleteDisabled = IsNode(element) && (IsAspectNode(element) || element === selectedNode);

  return (
    <Menu id="InspectorHeader" color={GetInspectorColor(element)}>
      <InspectorTabs
        project={project}
        element={element}
        activeTabIndex={activeTabIndex}
        attributeLikeItems={attributeLikeItems}
        terminalLikeItems={terminalLikeItems}
        compositeLikeItems={compositeLikeItems}
        changeInspectorTabAction={changeInspectorTabAction}
      />

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
              onClick={() => !deleteDisabled && Click.OnDelete(project, element, dispatch, inspectorRef)}
              type={!deleteDisabled ? InspectorButtonType.Delete : InspectorButtonType.DeleteDisabled}
              visible={true}
              disabled={deleteDisabled}
            />
          </>
        )}
        <Title
          onClick={() => onToggle(dispatch, open, inspectorRef, changeInspectorVisibilityAction, changeInspectorHeightAction)}
        >
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
    </Menu>
  );
};

export default InspectorHeader;
