import { memo } from "react";
import { Node, Connector } from "../../../../models";
import { Handle } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { IsValidBlockConnection, SetTerminalYPos, SetTerminalXPos, GetTerminalColor } from "./helpers";
import { HandleBox } from "./styled";
import { CreateId, IsInputTerminal, IsPartOf } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";

interface Props {
  nodes: Node[];
  height: number;
  width: number;
  terminals: Connector[];
  isParent: boolean;
  electro: boolean;
  dispatch: any;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Mimir terminal in form of a Flow Handle element with an icon on top.
 */
const HandleComponent = ({ nodes, height, width, terminals, isParent, electro, dispatch }: Props) => (
  <>
    {terminals.map((conn) => {
      const [type, pos] = GetBlockHandleType(conn, electro);
      const order = IsInputTerminal(conn) ? conn.inputOrder : conn.outputOrder;

      return (
        <HandleBox
          visible={conn.visible && !IsPartOf(conn)}
          id={"handle-" + conn.id}
          top={SetTerminalYPos(conn, pos, electro, isParent, order, height)}
          left={SetTerminalXPos(conn, pos, electro, isParent, order, width)}
          key={CreateId()}
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
