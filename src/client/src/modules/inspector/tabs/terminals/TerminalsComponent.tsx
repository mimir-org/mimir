import { Node } from "../../../../models";
import {
  IsInputTerminal,
  IsOutputTerminal,
} from "../../../../components/flow/helpers/common";
import TerminalsSelector from "./TerminalsSelector";
import { useState } from "react";

interface Props {
  node: Node;
}

const TerminalsComponent = ({ node }: Props) => {
  const terminals = node.connectors.filter(
    (conn) => IsInputTerminal(conn) || IsOutputTerminal(conn)
  );

  const [selectedTerminal, setSelectedTerminal] = useState();

  const onItemSelect = (item: any) => setSelectedTerminal(item);

  return (
    <TerminalsSelector terminals={terminals} onItemSelect={onItemSelect} />
  );
};

export default TerminalsComponent;
