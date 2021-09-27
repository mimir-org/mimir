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
} from "../../helpers/common";

interface Props {
  node: Node;
  nodes: Node[];
  terminals: Connector[];
  isParent: boolean;
  splitView: boolean;
}
/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param param0
 * @returns a Mimir terminal in form of a Flow Handler.
 */
const HandleComponent = ({
  node,
  nodes,
  terminals,
  isParent,
  splitView,
}: Props) => {
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
            input={SetTerminalYPos(inputCount, isParent)}
            output={SetTerminalYPos(outputCount, isParent)}
            id={"handle-" + conn.id}
            position={GetHandlePosition(pos)}
            key={"key-" + conn.id}
            visible={conn.visible}
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
