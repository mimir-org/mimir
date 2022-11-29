import { Node as FlowNode } from "react-flow-renderer";
import { InspectorTabsComponent } from "../tabs/InspectorTabsComponent";
import { MutableRefObject } from "react";
import { GetInspectorColor } from "./helpers/GetInspectorColor";
import { InspectorHeaderBox } from "./InspectorHeader.styled";
import { InspectorButtonsComponent } from "./components/InspectorButtonsComponent";
import { Dispatch } from "redux";
import { Project, Attribute } from "@mimirorg/modelbuilder-types";
import {
  ChangeInspectorHeightAction,
  ChangeInspectorTabAction,
  ChangeInspectorVisibilityAction,
  InspectorElement,
  OnToogleHandler,
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
  attributes?: Attribute[];
  selectedFlowNodes: FlowNode[];
}

/**
 * The header component for the Inspector Module.
 * @param props
 * @returns a container for the tabs and the buttons in the Inspector Header.
 */
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
  attributes,
  selectedFlowNodes,
}: Props) => {
  const tabsVisible = isBlockView ? true : selectedFlowNodes?.length < 2;

  return (
    <InspectorHeaderBox id="InspectorHeader" color={GetInspectorColor(project?.nodes, element, tabsVisible)}>
      {tabsVisible && (
        <InspectorTabsComponent
          project={project}
          element={element}
          activeTabIndex={activeTabIndex}
          attributes={attributes}
          changeInspectorTabAction={changeInspectorTabAction}
          inspectorRef={inspectorRef}
          isInspectorOpen={isInspectorOpen}
        />
      )}

      <InspectorButtonsComponent
        nodes={project?.nodes}
        edges={project?.edges}
        element={element}
        username={username}
        open={open}
        tabsVisible={tabsVisible}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeightAction}
        project={project}
        dispatch={dispatch}
      />
    </InspectorHeaderBox>
  );
};
