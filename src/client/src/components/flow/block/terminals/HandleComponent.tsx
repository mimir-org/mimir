/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node } from "../../../../models";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { GetTerminalColor, IsValidBlockConnection } from "./helpers";
import { HandleBox, HandleContainer } from "./styled";
import { IsPartOf } from "../../helpers";
import { ConnectorIcon } from "../../../../assets/icons/connectors";
import { OnMouseEnter, OnMouseLeave } from "./handlers";
import { electroSelector, nodeSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { IsConnectorVisible } from "../../../../helpers";

interface Props {
  node: Node;
  terminals: Connector[];
  offPage?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
const HandleComponent = ({ node, terminals, offPage }: Props) => {
  const dispatch = useAppDispatch();
  const nodes = useAppSelector(nodeSelector);
  const isElectro = useAppSelector(electroSelector);
  const [visible, setVisible] = useState(!offPage);
  const className = "react-flow__handle-block";
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setTimeout(() => {
      updateNodeInternals(node?.id);
    }, 200);
  }, [isElectro, terminals]);

  return (
    <HandleContainer isElectro={isElectro}>
      {terminals.map((conn) => {
        if (IsConnectorVisible(conn)) {
          const [type, pos] = GetBlockHandleType(conn, isElectro);

          return (
            <HandleBox
              visible={visible && !IsPartOf(conn)}
              id={"handle-" + conn.id}
              key={conn.id}
              onMouseEnter={offPage ? () => OnMouseEnter(setVisible) : null}
              onMouseLeave={offPage ? () => OnMouseLeave(setVisible) : null}
            >
              <ConnectorIcon style={{ fill: GetTerminalColor(conn) }} className={className} />
              <Handle
                type={type}
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
    </HandleContainer>
  );
};

export default HandleComponent;
