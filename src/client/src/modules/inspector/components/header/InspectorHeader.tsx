import InspectorTabs from "../tabs/InspectorTabs";
import { MutableRefObject } from "react";
import { Project } from "../../../../models";
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
  return (
    <InspectorHeaderContainer id="InspectorHeader" color={GetInspectorColor(element)}>
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

      <InspectorButtonRow
        project={project}
        element={element}
        username={username}
        open={open}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeightAction}
        dispatch={dispatch}
      />
    </InspectorHeaderContainer>
  );
};
