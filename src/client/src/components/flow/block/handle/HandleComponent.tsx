/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node } from "../../../../models";
import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { GetBlockHandleType, IsValidBlockConnection, ShowHandle } from "./helpers";
import { HandleBox, HandleContainer } from "./HandleComponent.styled";
import { GetTerminalColor } from "../helpers";
import { OnMouseEnter, OnMouseLeave } from "./handlers";
import { electroSelector, projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { HandleIcon } from "./components/HandleIcon";

interface Props {
  node: Node;
  terminals: Connector[];
  offPage?: boolean;
  isInput?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
export const HandleComponent = ({ node, terminals, offPage, isInput }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
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
        if (ShowHandle(conn, isInput)) {
          const [type, pos] = GetBlockHandleType(conn, isElectro);
          const color = GetTerminalColor(conn);

          return (
            <HandleBox
              visible={visible}
              id={"handle-" + conn.id}
              key={conn.id}
              onMouseEnter={offPage ? () => OnMouseEnter(setVisible) : null}
              onMouseLeave={offPage ? () => OnMouseLeave(setVisible) : null}
            >
              <HandleIcon conn={conn} color={color} className={className} />
              <Handle
                type={type}
                position={pos}
                id={conn.id}
                className={className}
                isValidConnection={(connection) => IsValidBlockConnection(connection, project, dispatch)}
              />
            </HandleBox>
          );
        }
        return null;
      })}
    </HandleContainer>
  );
};
