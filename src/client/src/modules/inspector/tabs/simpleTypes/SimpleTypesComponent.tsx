import { Composite, Node } from "../../../../models";
import { SimpleTypesSelector } from "./";
import { useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "../terminals/styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "../terminals/styled/TerminalsParametersWrapper";

interface Props {
  node: Node;
}
/**
 * Component for SimpleTypes in the Inspector for all Product aspects.
 * @param node
 * @returns a drop-down menu where you can access a Node's SimpleTypes and attributes.
 */
const SimpleTypesComponent = ({ node }: Props) => {
  const simpleTypes = node.composites;
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);

  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const onSelect = (item: Composite) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsWrapper>
      <SimpleTypesSelector simpleTypes={simpleTypes} onSelect={onSelect} />
      {selectedSimpleType && (
        <TerminalsParametersWrapper>
          <ParametersContent parametersElement={selectedSimpleType} elementIsLocked={node.isLocked} />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default SimpleTypesComponent;
