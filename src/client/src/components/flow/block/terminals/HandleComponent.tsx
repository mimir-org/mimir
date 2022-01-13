/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node } from "../../../../models";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { GetTerminalColor, IsValidBlockConnection, SetTerminalXPos, SetTerminalYPos } from "./helpers";
import { HandleBox } from "./styled";
import { IsInputTerminal, IsPartOf } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";
import { OnMouseEnter, OnMouseLeave } from "./handlers";
import { BlockNodeSize } from "../../../../models/project";
import { nodeSelector, useAppSelector } from "../../../../redux/store";
import { Dispatch } from "redux";

interface Props {
  node: Node;
  size: BlockNodeSize;
  terminals: Connector[];
  dispatch: Dispatch;
  isParent?: boolean;
  electro?: boolean;
  offPage?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
const HandleComponent = ({ node, size, terminals, dispatch, isParent, electro, offPage }: Props) => {
  const nodes = useAppSelector(nodeSelector);
  const [visible, setVisible] = useState(!offPage);
  const className = "react-flow__handle-block";
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setTimeout(() => {
      updateNodeInternals(node?.id);
    }, 200);
  }, [electro, terminals]);

  return (
    <>
      {terminals.map((conn) => {
        if (conn.visible) {
          const [type, pos] = GetBlockHandleType(conn, electro);
          const order = IsInputTerminal(conn) ? conn.inputOrder : conn.outputOrder;
          const topPos = SetTerminalYPos(conn, pos, electro, isParent, order, size.height);
          const leftPos = SetTerminalXPos(conn, pos, electro, offPage, isParent, order, size.width);

          return (
            <HandleBox
              visible={visible && conn.visible && !IsPartOf(conn)}
              id={"handle-" + conn.id}
              top={topPos}
              left={leftPos}
              key={conn.id}
              onMouseEnter={offPage ? () => OnMouseEnter(setVisible) : null}
              onMouseLeave={offPage ? () => OnMouseLeave(setVisible) : null}
            >
              <ConnectorIcon style={{ fill: GetTerminalColor(conn) }} className={className} />
              <Handle
                type={type}
                style={electro ? { marginLeft: "7px" } : { marginTop: "9px" }}
                position={pos}
                id={conn.id}
                className={className}
                isValidConnection={(connection) => IsValidBlockConnection(connection, nodes, dispatch)}
              />
            </HandleBox>
          );
        }
        return null;
      })}
    </>
  );
};

export default HandleComponent;
