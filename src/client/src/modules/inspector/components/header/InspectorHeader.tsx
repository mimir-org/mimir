import { Node as FlowNode } from "react-flow-renderer";
import { InspectorTabsComponent } from "../tabs/InspectorTabsComponent";
import { MutableRefObject } from "react";
import { InspectorHeaderBox } from "./InspectorHeader.styled";
import { InspectorButtonsComponent } from "./components/InspectorButtonsComponent";
import { Dispatch } from "redux";
import {
  ChangeInspectorHeightAction,
  ChangeInspectorTabAction,
  ChangeInspectorVisibilityAction,
  InspectorElement,
  OnToogleHandler,
} from "../../types";
import { AspectColor, AspectObject, Attribute, Connection, Project } from "lib";
import { Theme, useMimirorgTheme } from "@mimirorg/component-library";

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
  const theme = useMimirorgTheme();
  const tabsVisible = isBlockView ? true : selectedFlowNodes?.length < 2;

  return (
    <InspectorHeaderBox id="InspectorHeader" color={element.aspectColor?.headerColor}>
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
        nodes={project?.aspectObjects}
        edges={project?.connections}
        element={element}
        username={username}
        open={open}
        tabsVisible={tabsVisible}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeightAction}
        project={project}
        dispatch={dispatch}
        isBlockView={isBlockView}
      />
    </InspectorHeaderBox>
  );
};
