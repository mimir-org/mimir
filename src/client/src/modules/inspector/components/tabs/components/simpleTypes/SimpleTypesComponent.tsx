import { Project, Simple } from "../../../../../../models";
import { SimpleTypesSelector } from "./components/SimpleTypesSelector";
import { useState } from "react";
import { InspectorElement, SimpleLikeItem } from "../../../../types";
import { GetSimpleTypes } from "./helpers/GetSimpleTypes";
import { IsCreateLibraryType } from "../../../../helpers/IsType";
import { TerminalsParametersWrapper, TerminalsWrapper } from "../terminals/TerminalsComponent.styled";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";

interface Props {
  element: InspectorElement;
  project: Project;
  simpleLikeItems?: SimpleLikeItem[];
}

/**
 * Component for SimpleTypes in the Inspector for all Product aspects.
 * @param node
 * @returns a drop-down menu where you can access a Node's SimpleTypes and attributes.
 */
export const SimpleTypesComponent = ({ element, project, simpleLikeItems }: Props) => {
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);
  const simpleTypes = simpleLikeItems ?? GetSimpleTypes(element);
  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;
  const onSelect = (item: Simple) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsWrapper>
      <SimpleTypesSelector simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
      {selectedSimpleType && (
        <TerminalsParametersWrapper>
          <ParametersContent
            parametersElement={selectedSimpleType}
            inspectorParentElement={element}
            project={project}
            elementIsLocked={elementIsLocked}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};
