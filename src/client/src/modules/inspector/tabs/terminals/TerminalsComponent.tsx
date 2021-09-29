import { Node } from "../../../../models";
import { IsTransportTerminal } from "../../../../components/flow/helpers/common";
import TerminalsSelector from "./TerminalsSelector";
import { useState } from "react";
import ParametersContent from "../parameters/ParametersContent";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";

interface Props {
  node: Node;
}

const TerminalsComponent = ({ node }: Props) => {
  const terminals = node.connectors.filter((conn) => IsTransportTerminal(conn));

  const [selectedTerminal, setSelectedTerminal] = useState();

  const onItemSelect = (item: any) => setSelectedTerminal(item);

  return (
    <TerminalsWrapper>
      <TerminalsSelector terminals={terminals} onItemSelect={onItemSelect} />
      {selectedTerminal && (
        <ParametersContent
          element={selectedTerminal}
          elementIsLocked={node.isLocked}
        />
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
