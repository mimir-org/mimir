import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidConnection, SetTopPos, SetLeftPos, GetTerminalColor } from "./helpers";
import { HandleBox } from "./styled";
import { CreateId, IsInputTerminal } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";
import { Size } from "../../../../compLibrary";

interface Props {
  node: Node;
  nodes: Node[];
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
const HandleComponent = ({ node, nodes, terminals, parent, splitView, electro, mainConnectNode }: Props) => {
  const className = "react-flow__handle-block";
  let inputs = 0;
  let outputs = 0;

  return (
    <div key={CreateId()}>
      {terminals.map((conn) => {
        const [type, pos] = GetBlockHandleType(conn, node?.isSelected, splitView, electro);
        IsInputTerminal(conn) ? inputs++ : outputs++;

        return (
          <HandleBox
            visible={conn.visible}
            id={"handle-" + conn.id}
            key={"key-" + conn.id}
            top={SetTopPos(pos, electro, parent, inputs, outputs, node?.length ?? Size.Node_Length, mainConnectNode)}
            left={SetLeftPos(
              pos,
              electro,
              parent,
              inputs,
              outputs,
              splitView,
              node?.width ?? Size.Node_Width,
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
        );
      })}
    </div>
  );
};

export default HandleComponent;
