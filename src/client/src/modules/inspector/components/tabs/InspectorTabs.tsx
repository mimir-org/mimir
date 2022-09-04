import { MutableRefObject } from "react";
import { Action } from "redux";
import { Attribute, Project, Simple, Terminal } from "@mimirorg/modelbuilder-types";
import { changeInspectorTab } from "../../redux/inspectorSlice";
import { ShouldShowTabs } from "./helpers";
import { InspectorElement } from "../../types";
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
  attributes?: Attribute[];
  terminals: Terminal[];
  simpleItems?: Simple[];
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
  isOffPage: boolean;
}

export const InspectorTabs = ({
  project,
  element,
  activeTabIndex,
  attributes,
  terminals,
  simpleItems,
  changeInspectorTabAction = changeInspectorTab,
  inspectorRef,
  isInspectorOpen,
  isOffPage,
}: Props) => {
  const shouldShowTabs = ShouldShowTabs(element);

  const tabs = [
    <AdminComponent key={0} element={element} project={project} />,
    <ParametersComponent key={1} element={element} attributes={attributes} />,
    <TerminalsComponent key={2} element={element} terminals={terminals} />,
    <RelationsComponent key={3} element={element} />,
    <SimpleTypesComponent key={4} element={element} simpleItems={simpleItems} />,
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
