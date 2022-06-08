import { MutableRefObject } from "react";
import { Action } from "redux";
import { Project } from "@mimirorg/modelbuilder-types";
import { changeInspectorTab } from "../../redux/inspectorSlice";
import { ShouldShowTabs } from "./helpers";
import { AttributeLikeItem, InspectorElement, SimpleLikeItem, TerminalLikeItem } from "../../types";
import {
  InspectorTabWrapper,
  AdminComponent,
  ParametersComponent,
  RelationsComponent,
  SimpleTypesComponent,
  TerminalsComponent,
} from "./components";

interface Props {
  project: Project;
  element: InspectorElement;
  activeTabIndex: number;
  attributeLikeItems?: AttributeLikeItem[];
  terminalLikeItems?: TerminalLikeItem[];
  simpleLikeItems?: SimpleLikeItem[];
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  isOffPage: boolean;
}

export const InspectorTabs = ({
  project,
  element,
  activeTabIndex,
  attributeLikeItems,
  terminalLikeItems,
  simpleLikeItems,
  changeInspectorTabAction = changeInspectorTab,
  inspectorRef,
  isInspectorOpen,
  isOffPage,
}: Props) => {
  const shouldShowTabs = ShouldShowTabs(element);

  const tabs = [
    <AdminComponent key={0} element={element} project={project} />,
    <ParametersComponent key={1} element={element} attributeLikeItems={attributeLikeItems} />,
    <TerminalsComponent key={2} element={element} terminalLikeItems={terminalLikeItems} />,
    <RelationsComponent key={3} element={element} />,
    <SimpleTypesComponent key={4} element={element} simpleLikeItems={simpleLikeItems} />,
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
                isOffPage={isOffPage}
                nodes={project?.nodes}
              >
                {tab}
              </InspectorTabWrapper>
            )
        )}
    </>
  );
};
