import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidConnection, SetTopPos, SetLeftPos } from "./helpers";
import { HandleBox } from "./styled";
import { IsInputTerminal } from "../../helpers";
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
 * @returns a Mimir terminal in form of a Flow Handle element with an icon on top.
 */
const HandleComponent = ({ node, nodes, terminals, isParent, splitView }: Props) => {
  const className = "react-flow__handle-block";
  let inputCount = 0;
  let outputCount = 0;
  const electro = false;

  return (
    <>
      {terminals.map((conn: Connector) => {
        const [type, pos] = GetBlockHandleType(conn, node.isSelected, splitView, electro);
        IsInputTerminal(conn) ? inputCount++ : outputCount++;

        return (
          <HandleBox
            top={SetTopPos(pos, electro, isParent, inputCount, outputCount)}
            left={SetLeftPos(pos, electro, isParent, inputCount, outputCount)}
            id={"handle-" + conn.id}
            key={"key-" + conn.id}
            visible={conn.visible}
          >
            <ConnectorIcon style={{ fill: conn.color ?? Color.Terminal_Default }} className={className} />
            <Handle
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
    </>
  );
};

export default HandleComponent;
