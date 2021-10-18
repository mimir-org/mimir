import { Node, Connector } from "../../../../models";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidConnection, SetTopPos, SetLeftPos, GetTerminalColor } from "./helpers";
import { HandleBox } from "./styled";
import { CreateId } from "../../helpers";
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
  const updateNodeInternals = useUpdateNodeInternals();
  updateNodeInternals(node?.id);

  return (
    <>
      {terminals.map((conn) => {
        const [type, pos] = GetBlockHandleType(conn, node?.isSelected, splitView, electro);

        return (
          <div key={CreateId()}>
            {conn.visible && (
              <HandleBox
                visible={conn.visible}
                id={"handle-" + conn.id}
                key={"key-" + conn.id}
                top={SetTopPos(pos, electro, parent, conn.inputOrder, conn.outputOrder, length, mainConnectNode)}
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
                  style={{
                    marginTop: "7px",
                  }}
                  position={pos}
                  id={conn.id}
                  className={className}
                  isValidConnection={(connection) => IsValidConnection(connection, nodes, terminals)}
                />
              </HandleBox>
            )}
          </div>
        );
      })}
    </>
  );
};

export default HandleComponent;
