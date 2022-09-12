import { MutableRefObject } from "react";
import { Action } from "redux";
import { Attribute, Project, Simple, Terminal } from "@mimirorg/modelbuilder-types";
import { changeInspectorTab } from "../../redux/inspectorSlice";
import { ShouldShowTabs } from "./helpers";
import { InspectorElement } from "../../types";
import { GetAttributesElement } from "./components/parameters/helpers/GetAttributesElement";
import {
  InspectorTabElement,
  AdminComponent,
  AttributesComponent,
  RelationsComponent,
  SimpleTypesComponent,
  TerminalAttributesComponent,
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

/**
 * Component for all the tabs showed in the Inspector Module.
 * @param props
 * @returns all available tabs.
 */
export const InspectorTabsComponent = ({
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
  const elements = GetAttributesElement(element);

  const tabs = [
    <AdminComponent key={0} element={element} project={project} />,
    <AttributesComponent key={1} attributesElem={elements} inspectorParentElem={element} attributeItems={attributes} />,
    <TerminalAttributesComponent key={2} element={element} terminals={terminals} />,
    <RelationsComponent key={3} element={element} />,
    <SimpleTypesComponent key={4} element={element} simpleItems={simpleItems} />,
  ];

  return (
    <>
      {element &&
        tabs.map(
          (tab, i) =>
            shouldShowTabs[i] && (
              <InspectorTabElement
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
              </InspectorTabElement>
            )
        )}
    </>
  );
};
