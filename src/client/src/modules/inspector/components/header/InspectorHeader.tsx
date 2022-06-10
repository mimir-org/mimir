import { Node as FlowNode } from "react-flow-renderer";
import { InspectorTabs } from "../tabs/InspectorTabs";
import { MutableRefObject } from "react";
import { GetInspectorColor } from "./helpers/GetInspectorColor";
import { GetInspectorHeaderText } from "./helpers/GetInspectorHeaderText";
import { InspectorHeaderContainer } from "./InspectorHeader.styled";
import { InspectorButtonRow } from "./components/InspectorButtonRow";
import { IsNode } from "../../helpers/IsType";
import { Dispatch } from "redux";
import { Aspect, Project } from "@mimirorg/modelbuilder-types";
import {
  AttributeLikeItem,
  ChangeInspectorHeightAction,
  ChangeInspectorTabAction,
  ChangeInspectorVisibilityAction,
  InspectorElement,
  OnToogleHandler,
  SimpleLikeItem,
  TerminalLikeItem,
} from "../../types";

interface Props {
  project: Project;
  element: InspectorElement;
  username: string;
  dispatch: Dispatch;
  open: boolean;
  isBlockView: boolean;
  activeTabIndex: number;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: ChangeInspectorHeightAction;
  changeInspectorTabAction?: ChangeInspectorTabAction;
  onToggle?: OnToogleHandler;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  simpleLikeItems?: SimpleLikeItem[];
  selectedFlowNodes: FlowNode[];
}

export const InspectorHeader = ({
  project,
  element,
  username,
  dispatch,
  open,
  isBlockView,
  activeTabIndex,
  inspectorRef,
  isInspectorOpen,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  changeInspectorTabAction,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
  selectedFlowNodes,
}: Props) => {
  const tabsVisible = isBlockView ? true : selectedFlowNodes?.length < 2;
  const isOffPage = IsNode(element) ? element.aspect === Aspect.None : false;

  return (
    <InspectorHeaderContainer id="InspectorHeader" color={GetInspectorColor(project?.nodes, element, isOffPage, tabsVisible)}>
      {tabsVisible && (
        <>
          <InspectorTabs
            project={project}
            element={element}
            activeTabIndex={activeTabIndex}
            attributeLikeItems={attributeLikeItems}
            terminalLikeItems={terminalLikeItems}
            simpleLikeItems={simpleLikeItems}
            changeInspectorTabAction={changeInspectorTabAction}
            inspectorRef={inspectorRef}
            isInspectorOpen={isInspectorOpen}
            isOffPage={isOffPage}
          />
          {GetInspectorHeaderText(element)}
        </>
      )}

      <InspectorButtonRow
        nodes={project?.nodes}
        edges={project?.edges}
        element={element}
        username={username}
        open={open}
        tabsVisible={tabsVisible}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeightAction}
        dispatch={dispatch}
      />
    </InspectorHeaderContainer>
  );
};
