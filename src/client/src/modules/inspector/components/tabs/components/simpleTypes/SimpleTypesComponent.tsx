import { SimpleTypesSelector } from "./components/SimpleTypesSelector";
import { useState } from "react";
import { InspectorElement, SimpleLikeItem } from "../../../../types";
import { GetSimpleTypes } from "./helpers/GetSimpleTypes";
import { TerminalsParametersWrapper, TerminalsWrapper } from "../terminals/TerminalsComponent.styled";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { Simple } from "@mimirorg/modelbuilder-types";

interface Props {
  element: InspectorElement;
  simpleLikeItems?: SimpleLikeItem[];
}

/**
 * Component for SimpleTypes in the Inspector for all Product aspects.
 * @param node
 * @returns a drop-down menu where you can access a Node's SimpleTypes and attributes.
 */
export const SimpleTypesComponent = ({ element, simpleLikeItems }: Props) => {
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);
  const simpleTypes = simpleLikeItems ?? GetSimpleTypes(element);
  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const onSelect = (item: Simple) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsWrapper>
      <SimpleTypesSelector simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
      {selectedSimpleType && (
        <TerminalsParametersWrapper>
          <ParametersContent parametersElement={selectedSimpleType} inspectorParentElement={element} />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};
