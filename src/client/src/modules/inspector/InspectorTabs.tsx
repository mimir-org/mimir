import { Project } from "../../models";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { Action } from "redux";
import { InspectorTabWrapper } from "./";
import { changeInspectorTab } from "./redux/tabs/actions";
import { ShouldShowTabs } from "./helpers";
import { ParametersComponent, TerminalsComponent, RelationsComponent, SimpleTypesComponent, AdminComponent } from "./tabs";

interface Props {
  project: Project;
  element: InspectorElement;
  activeTabIndex: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  compositeLikeItems?: CompositeLikeItem[];
  changeInspectorTabAction?: (index: number) => Action;
}

const InspectorTabs = ({
  project,
  element,
  activeTabIndex,
  attributeLikeItems,
  terminalLikeItems,
  compositeLikeItems,
  changeInspectorTabAction = changeInspectorTab,
}: Props) => {
  const shouldShowTabs = ShouldShowTabs(element);

  const tabs = [
    <AdminComponent element={element} project={project} />,
    <ParametersComponent element={element} attributeLikeItems={attributeLikeItems} />,
    <TerminalsComponent element={element} terminalLikeItems={terminalLikeItems} />,
    <RelationsComponent element={element} />,
    <SimpleTypesComponent element={element} compositeLikeItems={compositeLikeItems} />,
  ];

  return (
    <>
      {element &&
        tabs.map(
          (tab, i) =>
            shouldShowTabs[i] && (
              <InspectorTabWrapper
                key={i}
                element={element}
                index={i}
                activeTabIndex={activeTabIndex}
                changeInspectorTabAction={changeInspectorTabAction}
              >
                {tab}
              </InspectorTabWrapper>
            )
        )}
    </>
  );
};

export default InspectorTabs;
