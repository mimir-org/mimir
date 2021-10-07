import { Composite, Node } from "../../../../models";
import { SimpleTypesSelector } from "./";
import { useState } from "react";
import { ParametersContent } from "../parameters";
import { TerminalsWrapper } from "../terminals/styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "../terminals/styled/TerminalsParametersWrapper";

interface Props {
  node: Node;
}

const SimpleTypesComponent = ({ node }: Props) => {
  const simpleTypes = node.composites;
  const [selectedSimpleTypeId, setSelectedSimpleTypeId] = useState<string>(null);

  const selectedSimpleType = simpleTypes.find((t) => t.id === selectedSimpleTypeId);
  const onSelectSimpleType = (item: Composite) => setSelectedSimpleTypeId(item.id);

  return (
    <TerminalsWrapper>
      <SimpleTypesSelector simpleTypes={simpleTypes} onSelectSimpleType={onSelectSimpleType} />
      {selectedSimpleType && (
        <TerminalsParametersWrapper>
          <ParametersContent element={selectedSimpleType} elementIsLocked={node.isLocked} />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default SimpleTypesComponent;
