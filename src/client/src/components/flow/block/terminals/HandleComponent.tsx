import { memo } from "react";
import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidBlockConnection, SetTerminalYPos, SetTerminalXPos, GetTerminalColor } from "./helpers";
import { HandleBox } from "./styled";
import { IsInputTerminal, IsPartOf } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";
import { BlockNodeSize } from "../../../../models/project";

interface Props {
  nodes: Node[];
  size: BlockNodeSize;
  terminals: Connector[];
  dispatch: any;
  isParent?: boolean;
  electro?: boolean;
  offPage?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Mimir terminal in form of a Flow Handle element with an icon on top.
 */
const HandleComponent = ({ nodes, size, terminals, dispatch, isParent = false, electro = false, offPage = false }: Props) => (
  <>
    {terminals.map((conn) => {
      const [type, pos] = GetBlockHandleType(conn, electro);
      const order = IsInputTerminal(conn) ? conn.inputOrder : conn.outputOrder;

      return (
        <HandleBox
          visible={conn.visible && !IsPartOf(conn)}
          id={"handle-" + conn.id}
          top={SetTerminalYPos(conn, pos, electro, isParent, order, size.height)}
          left={SetTerminalXPos(conn, pos, electro, offPage, isParent, order, size.width)}
          key={conn.id}
        >
          <ConnectorIcon style={{ fill: GetTerminalColor(conn) }} className={"react-flow__handle-block"} />
          <Handle
            type={type}
            style={electro ? { marginLeft: "7px" } : { marginTop: "7px" }}
            position={pos}
            id={conn.id}
            className={"react-flow__handle-block"}
            isValidConnection={(connection) => IsValidBlockConnection(connection, nodes, dispatch)}
          />
        </HandleBox>
      );
    })}
  </>
);

export default memo(HandleComponent);
