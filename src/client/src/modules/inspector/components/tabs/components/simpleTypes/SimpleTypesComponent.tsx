import { SimpleTypesSelector } from "./components/SimpleTypesSelector";
import { useState } from "react";
import { InspectorElement } from "../../../../types";
import { GetSimpleTypes } from "./helpers/GetSimpleTypes";
import { TerminalAttributesBox, TerminalsBox } from "../terminals/TerminalAttributesComponent.styled";
import { Simple } from "@mimirorg/modelbuilder-types";
import { AttributesComponent } from "../parameters/AttributesComponent";

interface Props {
  element: InspectorElement;
  simpleItems?: Simple[];
}

/**
 * Component for SimpleTypes in the Inspector for all Product aspects.
 * @param node
 * @returns a drop-down menu where you can access a Node's SimpleTypes and attributes.
 */
export const SimpleTypesComponent = ({ element, simpleItems }: Props) => {
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);
  const simpleTypes = simpleItems ?? GetSimpleTypes(element);
  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const onSelect = (item: Simple) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsBox>
      <SimpleTypesSelector simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
      {selectedSimpleType && (
        <TerminalAttributesBox>
          <AttributesComponent attributesElem={selectedSimpleType} inspectorParentElem={element} />
        </TerminalAttributesBox>
      )}
    </TerminalsBox>
  );
};
