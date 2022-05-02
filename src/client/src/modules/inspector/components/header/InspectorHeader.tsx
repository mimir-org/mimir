import InspectorTabs from "../tabs/InspectorTabs";
import { MutableRefObject } from "react";
import { Project } from "../../../../models";
import { GetInspectorColor } from "./helpers/GetInspectorColor";
import { GetInspectorHeaderText } from "./helpers/GetInspectorHeaderText";
import { InspectorHeaderContainer } from "./InspectorHeader.styled";
import { InspectorButtonRow } from "./components/InspectorButtonRow";
import { Dispatch } from "redux";
import { GetSelectedFlowNodes } from "../../../../helpers/Selected";
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
}

export const InspectorHeader = ({
  project,
  element,
  username,
  dispatch,
  open,
  activeTabIndex,
  inspectorRef,
  isInspectorOpen,
  changeInspectorVisibilityAction,
  changeInspectorHeightAction,
  changeInspectorTabAction,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
}: Props) => {
  const selectedFlowNodes = GetSelectedFlowNodes();
  const tabsVisible = selectedFlowNodes?.length < 2;

  return (
    <InspectorHeaderContainer id="InspectorHeader" color={GetInspectorColor(element, tabsVisible)}>
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
