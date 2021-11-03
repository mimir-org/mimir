import { Project } from "../../models";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { Action } from "redux";
import InspectorTabWrapper from "./InspectorTabWrapper";
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
  const [shouldShowAdmin, ...shouldShowTabs] = ShouldShowTabs(element);

  const tabs = [
    <ParametersComponent element={element} attributeLikeItems={attributeLikeItems} />,
    <TerminalsComponent element={element} terminalLikeItems={terminalLikeItems} />,
    <RelationsComponent element={element} />,
    <SimpleTypesComponent element={element} compositeLikeItems={compositeLikeItems} />,
  ];

  return (
    <>
      {element && (
        <>
          {shouldShowAdmin && (
            <AdminComponent
              element={element}
              project={project}
              index={0}
              activeTabIndex={activeTabIndex}
              changeInspectorTabAction={changeInspectorTabAction}
            />
          )}
          {tabs.map(
            (tab, i) =>
              shouldShowTabs[i] && (
                <InspectorTabWrapper
                  key={i}
                  element={element}
                  index={i + 1}
                  activeTabIndex={activeTabIndex}
                  changeInspectorTabAction={changeInspectorTabAction}
                >
                  {tab}
                </InspectorTabWrapper>
              )
          )}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
