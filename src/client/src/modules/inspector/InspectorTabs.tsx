import { Project } from "../../models";
import { AdminComponent } from "./tabs/admin";
import { AttributeLikeItem, CompositeLikeItem, InspectorElement, TerminalLikeItem } from "./types";
import { Action } from "redux";
import InspectorTabWrapper from "./InspectorTabWrapper";
import { changeInspectorTab } from "./redux/tabs/actions";
import { ParametersComponent } from "./tabs/parameters";
import { RelationsComponent } from "./tabs/relations";
import { SimpleTypesComponent } from "./tabs/simpleTypes";
import { TerminalsComponent } from "./tabs/terminals";
import { ShouldShowTabs } from "./helpers";

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
  const [shouldShowAdmin, shouldShowParameters, shouldShowTerminals, shouldShowRelations, shouldShowSimpleTypes] =
    ShouldShowTabs(element);

  const tabs = [
    shouldShowParameters && <ParametersComponent element={element} attributeLikeItems={attributeLikeItems} />,
    shouldShowTerminals && <TerminalsComponent element={element} terminalLikeItems={terminalLikeItems} />,
    shouldShowRelations && <RelationsComponent element={element} />,
    shouldShowSimpleTypes && <SimpleTypesComponent element={element} compositeLikeItems={compositeLikeItems} />,
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
          {tabs.map((tab, i) => (
            <InspectorTabWrapper
              key={i}
              element={element}
              index={i + 1}
              activeTabIndex={activeTabIndex}
              changeInspectorTabAction={changeInspectorTabAction}
            >
              {tab}
            </InspectorTabWrapper>
          ))}
        </>
      )}
    </>
  );
};

export default InspectorTabs;
