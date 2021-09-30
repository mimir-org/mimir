import { Connector, Node } from "../../../../models";
import { IsTransportTerminal } from "../../../../components/flow/helpers/common";
import TerminalsSelector from "./TerminalsSelector";
import { useState } from "react";
import ParametersContent from "../parameters/ParametersContent";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";

interface Props {
  node: Node;
}

const TerminalsComponent = ({ node }: Props) => {
  const terminals = node.connectors.filter((conn) => IsTransportTerminal(conn));

  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);

  const onItemSelect = (item: Connector) => setSelectedTerminalId(item.id);

  return (
    <TerminalsWrapper>
      <TerminalsSelector terminals={terminals} onItemSelect={onItemSelect} />
      {selectedTerminalId && (
        <TerminalsParametersWrapper>
          <ParametersContent
            element={terminals.find(
              (terminal) => terminal.id === selectedTerminalId
            )}
            elementIsLocked={node.isLocked}
          />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
