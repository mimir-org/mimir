import { Project } from "../../models";
import { AttributeLikeItem, InspectorElement, SimpleLikeItem, TerminalLikeItem } from "./types";
import { Action } from "redux";
import { InspectorTabWrapper } from "./";
import { changeInspectorTab } from "./redux/inspectorSlice";
import { ShouldShowTabs } from "./helpers";
import { AdminComponent, ParametersComponent, RelationsComponent, SimpleTypesComponent, TerminalsComponent } from "./tabs";

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
    <AdminComponent key={0} element={element} project={project} />,
    <ParametersComponent key={1} element={element} project={project} attributeLikeItems={attributeLikeItems} />,
    <TerminalsComponent key={2} element={element} project={project} terminalLikeItems={terminalLikeItems} />,
    <RelationsComponent key={3} element={element} />,
    <SimpleTypesComponent key={4} element={element} project={project} simpleLikeItems={simpleLikeItems} />,
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
