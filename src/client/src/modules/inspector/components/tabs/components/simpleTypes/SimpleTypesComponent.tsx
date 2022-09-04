import { SimpleTypesSelector } from "./components/SimpleTypesSelector";
import { useState } from "react";
import { InspectorElement } from "../../../../types";
import { GetSimpleTypes } from "./helpers/GetSimpleTypes";
import { TerminalsParametersBox, TerminalsBox } from "../terminals/TerminalsComponent.styled";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { Simple } from "@mimirorg/modelbuilder-types";

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
        <TerminalsParametersBox>
          <ParametersContent parametersElement={selectedSimpleType} inspectorParentElement={element} />
        </TerminalsParametersBox>
      )}
    </TerminalsBox>
  );
};
