import { Project } from "../../models";
import { AttributeLikeItem, SimpleLikeItem, InspectorElement, TerminalLikeItem } from "./types";
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
  simpleLikeItems?: SimpleLikeItem[];
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
}

const InspectorTabs = ({
  project,
  element,
  activeTabIndex,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
  changeInspectorTabAction = changeInspectorTab,
  inspectorRef,
  isInspectorOpen,
}: Props) => {
  const shouldShowTabs = ShouldShowTabs(element);

  const tabs = [
    <AdminComponent element={element} project={project} />,
    <ParametersComponent element={element} project={project} attributeLikeItems={attributeLikeItems} />,
    <TerminalsComponent element={element} project={project} terminalLikeItems={terminalLikeItems} />,
    <RelationsComponent element={element} />,
    <SimpleTypesComponent element={element} project={project} simpleLikeItems={simpleLikeItems} />,
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
                inspectorRef={inspectorRef}
                isInspectorOpen={isInspectorOpen}
              >
                {tab}
              </InspectorTabWrapper>
            )
        )}
    </>
  );
};

export default InspectorTabs;
