import * as Click from "./handlers";
import { BlobData, Project } from "../../models";
import { GetInspectorColor, GetInspectorHeaderText } from "./helpers";
import { Menu } from "./styled";
import { InspectorTabs } from ".";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { Action, Dispatch } from "redux";
import { InspectorButtonRow } from "./";

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

      {GetInspectorHeaderText(element, icons)}

      <InspectorButtonRow
        project={project}
        element={element}
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
