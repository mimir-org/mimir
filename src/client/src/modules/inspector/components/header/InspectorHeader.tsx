import InspectorTabs from "../tabs/InspectorTabs";
import { MutableRefObject } from "react";
import { BlobData, Project } from "../../../../models";
import { GetInspectorColor } from "./helpers/GetInspectorColor";
import { GetInspectorHeaderText } from "./helpers/GetInspectorHeaderText";
import { InspectorHeaderContainer } from "./InspectorHeader.styled";
import { InspectorButtonRow } from "./components/InspectorButtonRow";
import { Dispatch } from "redux";
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
  inspectorVisibilityAction: ChangeInspectorVisibilityAction;
  inspectorHeightAction: ChangeInspectorHeightAction;
  inspectorTabAction?: ChangeInspectorTabAction;
  onToggle?: OnToogleHandler;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  simpleLikeItems?: SimpleLikeItem[];
  icons?: BlobData[];
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
  inspectorVisibilityAction,
  inspectorHeightAction,
  inspectorTabAction,
  icons,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
}: Props) => {
  return (
    <InspectorHeaderContainer id="InspectorHeader" color={GetInspectorColor(element)}>
      <InspectorTabs
        project={project}
        element={element}
        activeTabIndex={activeTabIndex}
        attributeLikeItems={attributeLikeItems}
        terminalLikeItems={terminalLikeItems}
        simpleLikeItems={simpleLikeItems}
        inspectorTabAction={inspectorTabAction}
        inspectorRef={inspectorRef}
        isInspectorOpen={isInspectorOpen}
      />

      {GetInspectorHeaderText(element, icons)}

      <InspectorButtonRow
        nodes={project?.nodes}
        edges={project?.edges}
        element={element}
        username={username}
        open={open}
        inspectorRef={inspectorRef}
        inspectorVisibilityAction={inspectorVisibilityAction}
        inspectorHeightAction={inspectorHeightAction}
        dispatch={dispatch}
      />
    </InspectorHeaderContainer>
  );
};
