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
  length: number;
  width: number;
  terminals: Connector[];
  parent: boolean;
  electro: boolean;
  mainConnectNode: boolean;
}
/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Mimir terminal in form of a Flow Handle element with an icon on top.
 */
const HandleComponent = ({ node, nodes, length, width, terminals, parent, electro, mainConnectNode }: Props) => (
  <>
    {terminals.map((conn) => {
      const [type, pos] = GetBlockHandleType(conn, node?.isSelected, false, electro);
      const order = IsInputTerminal(conn) ? conn.inputOrder : conn.outputOrder;

      return (
        <div key={CreateId()}>
          <HandleBox
            visible={conn.visible}
            id={"handle-" + conn.id}
            top={SetTopPos(pos, electro, parent, order, length, mainConnectNode)}
            left={SetLeftPos(pos, electro, parent, order, width, mainConnectNode)}
          >
            <ConnectorIcon style={{ fill: GetTerminalColor(conn) }} className={"react-flow__handle-block"} />
            <Handle
              type={type}
              style={electro ? { marginLeft: "7px" } : { marginTop: "7px" }}
              position={pos}
              id={conn.id}
              className={"react-flow__handle-block"}
              isValidConnection={(connection) => IsValidConnection(connection, nodes, terminals)}
            />
          </HandleBox>
        </div>
      );
    })}
  </>
);

export default HandleComponent;
