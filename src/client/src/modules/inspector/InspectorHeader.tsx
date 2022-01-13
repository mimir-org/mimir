import * as Click from "./handlers";
import { BlobData, Project } from "../../models";
import { GetInspectorColor, GetInspectorHeaderText } from "./helpers";
import { Menu } from "./styled";
import { InspectorButtonRow, InspectorTabs } from ".";
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
} from "./types";

interface Props {
  project: Project;
  element: InspectorElement;
  username: string;
  dispatch: Dispatch;
  open: boolean;
  activeTabIndex: number;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  changeInspectorVisibilityAction: ChangeInspectorVisibilityAction;
  changeInspectorHeightAction: ChangeInspectorHeightAction;
  changeInspectorTabAction?: ChangeInspectorTabAction;
  onToggle?: OnToogleHandler;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  simpleLikeItems?: SimpleLikeItem[];
  icons?: BlobData[];
}

const InspectorHeader = ({
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
  onToggle = Click.OnToggle,
  icons,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
}: Props) => {
  return (
    <Menu id="InspectorHeader" color={GetInspectorColor(element)}>
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

      {GetInspectorHeaderText(element, icons)}

      <InspectorButtonRow
        project={project}
        element={element}
        username={username}
        open={open}
        inspectorRef={inspectorRef}
        changeInspectorVisibilityAction={changeInspectorVisibilityAction}
        changeInspectorHeightAction={changeInspectorHeightAction}
        onToggle={onToggle}
        dispatch={dispatch}
      />
    </Menu>
  );
};

export default InspectorHeader;
