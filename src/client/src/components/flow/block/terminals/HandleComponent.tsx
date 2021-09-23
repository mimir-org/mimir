import { Node, Connector } from "../../../../models";
import { HandleBox } from "../../../../compLibrary/blockView";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../helpers/block";
import { IsValidConnection } from "./helpers";
import {
  GetConnectorIcon,
  GetHandlePosition,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  SetTerminalYPos,
  IsFunction,
} from "../../helpers/common";

interface Props {
  node: Node;
  nodes: Node[];
  terminals: Connector[];
  splitView: boolean;
}
/**  Components for the terminals displayed on the nodes in BlockView.
 *   The component returns a list of terminals in form of a Flow Handle element.
 */
const HandleComponent = ({ node, nodes, terminals, splitView }: Props) => {
  let inputCount = 0;
  let outputCount = 0;

  return (
    <>
      {terminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(
          conn,
          node.isSelected,
          splitView
        );
        if (!IsLocationTerminal(conn)) {
          if (IsInputTerminal(conn)) inputCount++;
          if (IsOutputTerminal(conn)) outputCount++;
        }

        return (
          <HandleBox
            input={SetTerminalYPos(inputCount)}
            output={SetTerminalYPos(outputCount)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={
              splitView
                ? conn.visible
                : IsFunction(node)
                ? !IsLocationTerminal(conn) && conn.visible
                : conn.visible
            }
            icon={GetConnectorIcon(conn.color)}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              className="react-flow__handle-block"
              isValidConnection={(connection) =>
                IsValidConnection(connection, nodes, terminals)
              }
            />
          </HandleBox>
        );
      })}
    </>
  );
};

export default HandleComponent;
