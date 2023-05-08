import { MutableRefObject, useEffect, useState } from "react";
import { Action } from "redux";
import { GetInspectorHeaderText } from "./helpers";
import { InspectorElement } from "../../types";
import { GetAttributesElement } from "./components/parameters/helpers/GetAttributesElement";
import {
  InspectorTabElement,
  AdminComponent,
  AttributesComponent,
  RelationsComponent,
  TerminalAttributesComponent,
} from "./components";
import { AspectObject, Attribute, ConnectorTerminal, Project } from "lib";

interface Props {
  project: Project;
  element: InspectorElement;
  activeTabIndex: number;
  attributes?: Attribute[];
  changeInspectorTabAction?: (index: number) => Action;
  inspectorRef: MutableRefObject<HTMLDivElement>;
  isInspectorOpen: boolean;
}

/**
 * Component for all the tabs showed in the Inspector Module.
 * @param interface
 * @returns all available tabs elements.
 */
export const InspectorTabsComponent = ({
  project,
  element,
  activeTabIndex,
  attributes,
  changeInspectorTabAction = null,
  inspectorRef,
  isInspectorOpen,
}: Props) => {
  const [terminals, setTerminals] = useState<ConnectorTerminal[]>([]);

  const elements = GetAttributesElement(element);
  const headerText = GetInspectorHeaderText(element);

  useEffect(() => {
    if (element instanceof AspectObject) {
      setTerminals(element.getTerminals());
    }
  }, [element]);

  const tabs = [
    <AdminComponent key={0} element={element} project={project} />,
    <AttributesComponent key={1} attributesElem={elements} inspectorParentElem={element} attributeItems={attributes} />,
    <TerminalAttributesComponent key={2} element={element} terminals={terminals} />,
    <RelationsComponent key={3} element={element} />,
  ];

  return (
    <>
      {element &&
        tabs.map((tab, i) => (
          <InspectorTabElement
            key={i}
            element={element}
            index={i}
            activeTabIndex={activeTabIndex}
            changeInspectorTabAction={changeInspectorTabAction}
            inspectorRef={inspectorRef}
            isInspectorOpen={isInspectorOpen}
            nodes={project?.aspectObjects}
          >
            {tab}
          </InspectorTabElement>
        ))}
      {headerText}
    </>
  );
};
