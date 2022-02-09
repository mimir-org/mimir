/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node } from "../../../../models";
import { Handle, useUpdateNodeInternals, Position } from "react-flow-renderer";
import { GetBlockHandleType } from "../../block/helpers";
import { GetTerminalColor, IsValidBlockConnection, ShowHandle } from "./helpers";
import { HandleBox, HandleContainer } from "./styled";
import { IsPartOf } from "../../helpers";
import { OnMouseEnter, OnMouseLeave } from "./handlers";
import { electroSelector, projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { TerminalIcon } from ".";

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
const HandleComponent = ({ node, terminals, offPage, isInput }: Props) => {
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

  const setPartOfPosX = (pos: Position, isElectro: boolean) => {
    if (isElectro) return "revert";
    if (pos === Position.Bottom) return "-90px";
    return "100px";
  };

  const setPartOfPosY = (pos: Position, isElectro: boolean) => {
    if (!isElectro) return "0px";
    if (pos === Position.Left) return "60px";
    if (pos === Position.Right) return "-60px";
    return "60px";
  };

  return (
    <HandleContainer isElectro={isElectro}>
      {terminals.map((conn) => {
        if (ShowHandle(conn, isInput)) {
          const [type, pos] = GetBlockHandleType(conn, isElectro);
          const color = GetTerminalColor(conn);

          return (
            <HandleBox
              visible={visible && !IsPartOf(conn)}
              isPartOf={IsPartOf(conn)}
              partOfPosX={setPartOfPosX(pos, isElectro)}
              partOfPosY={setPartOfPosY(pos, isElectro)}
              id={"handle-" + conn.id}
              key={conn.id}
              onMouseEnter={offPage ? () => OnMouseEnter(setVisible) : null}
              onMouseLeave={offPage ? () => OnMouseLeave(setVisible) : null}
            >
              <TerminalIcon conn={conn} color={color} className={className} />
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

export default HandleComponent;
