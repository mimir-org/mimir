import { Composite } from "../../../../models";
import { SimpleTypesSelector } from "./";
import { useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "../terminals/styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "../terminals/styled/TerminalsParametersWrapper";
import { CompositeLikeItem, InspectorElement } from "../../types";
import { GetSimpleTypes } from "./helpers/";
import { IsCreateLibraryType } from "../../helpers/IsType";

interface Props {
  element: InspectorElement;
  compositeLikeItems?: CompositeLikeItem[];
}
/**
 * Component for SimpleTypes in the Inspector for all Product aspects.
 * @param node
 * @returns a drop-down menu where you can access a Node's SimpleTypes and attributes.
 */
const SimpleTypesComponent = ({ element, compositeLikeItems }: Props) => {
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);
  const simpleTypes = compositeLikeItems ?? GetSimpleTypes(element);
  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;
  const onSelect = (item: Composite) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsWrapper>
      <SimpleTypesSelector simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
      {selectedSimpleType && (
        <TerminalsParametersWrapper>
          <ParametersContent
            parametersElement={selectedSimpleType}
            inspectorParentElement={element}
            elementIsLocked={elementIsLocked}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default SimpleTypesComponent;
