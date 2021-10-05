import { Connector, Node, TerminalType } from "../../../../models";
import { IsTransportTerminal } from "../../../../components/flow/helpers";
import TerminalsSelector from "./TerminalsSelector";
import { useState } from "react";
import ParametersContent from "../parameters/ParametersContent";
import { TerminalsWrapper } from "./styled/TerminalsWrapper";
import { TerminalsParametersWrapper } from "./styled/TerminalsParametersWrapper";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { GetFilteredTerminalsList } from "../../../../components/modules/typeEditorModule/helpers";

interface Props {
  node: Node;
}

const TerminalsComponent = ({ node }: Props) => {
  const categoryTypes =
    (useSelector<RootState>((state) => state.typeEditor.terminals) as TerminalType[]) ?? [];

  const terminals = node.connectors.filter((conn) => IsTransportTerminal(conn));
  const terminalCategories = GetFilteredTerminalsList(categoryTypes);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string>(null);
  const onSelectTerminal = (item: Connector) => setSelectedTerminalId(item.id);
  const selectedTerminal = terminals.find((terminal) => terminal.id === selectedTerminalId);

  return (
    <TerminalsWrapper>
      <TerminalsSelector
        terminals={terminals}
        terminalCategories={terminalCategories}
        selectedTerminalId={selectedTerminalId}
        onSelectTerminal={onSelectTerminal}
      />
      {selectedTerminal && (
        <TerminalsParametersWrapper>
          <ParametersContent element={selectedTerminal} elementIsLocked={node.isLocked} />
        </TerminalsParametersWrapper>
      )}
    </TerminalsWrapper>
  );
};

export default TerminalsComponent;
