import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidConnection } from "./helpers";
import { HandleBox } from "./styled";
import { IsInputTerminal, SetTerminalYPos } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";
import { Color } from "../../../../compLibrary";

interface Props {
  node: Node;
  nodes: Node[];
  terminals: Connector[];
  isParent: boolean;
  splitView: boolean;
}
/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Mimir terminal in form of a Flow Handler.
 */
const HandleComponent = ({ node, nodes, terminals, isParent, splitView }: Props) => {
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;

  return (
    <>
      {terminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn, node.isSelected, splitView);
        if (IsInputTerminal(conn)) inputCount++;
        if (!IsInputTerminal(conn)) outputCount++;

        return (
          <HandleBox
            isParent={isParent}
            input={SetTerminalYPos(inputCount, isParent)}
            output={SetTerminalYPos(outputCount, isParent)}
            id={"handle-" + conn.id}
            position={pos}
            key={"key-" + conn.id}
            visible={conn.visible}
          >
            <ConnectorIcon style={{ fill: conn.color ?? Color.Terminal_Default }} className={className} />
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              className={className}
              isValidConnection={(connection) => IsValidConnection(connection, nodes, terminals)}
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
