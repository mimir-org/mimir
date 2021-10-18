import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidConnection, SetTopPos, SetLeftPos, GetTerminalColor } from "./helpers";
import { HandleBox } from "./styled";
import { CreateId, IsInputTerminal } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";

interface Props {
  node: Node;
  nodes: Node[];
  width: number;
  length: number;
  terminals: Connector[];
  parent: boolean;
  splitView: boolean;
  electro: boolean;
  mainConnectNode: boolean;
}
/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Mimir terminal in form of a Flow Handle element with an icon on top.
 */
const HandleComponent = ({
  node,
  nodes,
  length,
  width,
  terminals,
  parent,
  splitView,
  electro,
  mainConnectNode,
}: Props) => {
  const className = "react-flow__handle-block";

  return (
    <div key={CreateId()}>
      {terminals.map((conn) => {
        const [type, pos] = GetBlockHandleType(conn, node?.isSelected, splitView, electro);

        if (IsInputTerminal(conn)) console.log(conn.inputOrder);
        return (
          <>
            <HandleBox
              visible={conn.visible}
              id={"handle-" + conn.id}
              key={"key-" + conn.id}
              top={IsInputTerminal(conn) ? conn.inputOrder * 20 : conn.outputOrder * 20}
              // top={SetTopPos(pos, electro, parent, conn.inputOrder, conn.outputOrder, length, mainConnectNode)}
              left={SetLeftPos(
                pos,
                electro,
                parent,
                conn.inputOrder,
                conn.outputOrder,
                splitView,
                width,
                mainConnectNode
              )}
            >
              <ConnectorIcon style={{ fill: GetTerminalColor(conn) }} className={className} />
              <Handle
                key={CreateId()}
                type={type}
                style={electro ? { marginLeft: "7px" } : { marginRight: "7px", marginTop: "7px" }}
                position={pos}
                id={conn.id}
                className={className}
                isValidConnection={(connection) => IsValidConnection(connection, nodes, terminals)}
              />
            </HandleBox>
          </>
        );
      })}
    </div>
  );
};

export default HandleComponent;
