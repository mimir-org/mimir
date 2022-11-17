import { MutableRefObject, useEffect, useState } from "react";
import { Action } from "redux";
import { Attribute, Project, Terminal } from "@mimirorg/modelbuilder-types";
import { changeInspectorTab } from "../../redux/inspectorSlice";
import { ShouldShowTabs, GetInspectorHeaderText } from "./helpers";
import { InspectorElement } from "../../types";
import { GetAttributesElement } from "./components/parameters/helpers/GetAttributesElement";
import {
  InspectorTabElement,
  AdminComponent,
  AttributesComponent,
  RelationsComponent,
  TerminalAttributesComponent,
} from "./components";
import { IsEdge, IsNode } from "../../helpers/IsType";
import { IsTerminal } from "../../../../components/flow/helpers/Connectors";

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
  changeInspectorTabAction = changeInspectorTab,
  inspectorRef,
  isInspectorOpen,
}: Props) => {
  const [terminals, setTerminals] = useState([] as Terminal[]);

  const shouldShowTabs = ShouldShowTabs(element);
  const elements = GetAttributesElement(element);
  const headerText = GetInspectorHeaderText(element);

  useEffect(() => {
    if (IsNode(element)) {
      setTerminals(element.connectors.filter((x) => IsTerminal(x) && !x.isProxy) as Terminal[]);
    }

    if (IsEdge(element) && element.transport) {
      const terminals: Terminal[] = [];
      terminals.push(element.transport.inputTerminal);
      terminals.push(element.transport.outputTerminal);
      setTerminals(terminals);
    }

    if (IsEdge(element) && element.interface) {
      const terminals: Terminal[] = [];
      terminals.push(element.interface.inputTerminal);
      terminals.push(element.interface.outputTerminal);
      setTerminals(terminals);
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
                nodes={project?.nodes}
              >
                {tab}
              </InspectorTabElement>
            )
        )}
      {headerText}
    </>
  );
};
