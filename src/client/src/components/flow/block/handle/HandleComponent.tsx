/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node } from "../../../../models";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./HandleComponent.styled";
import { electroSelector, projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { GetBlockNodeTerminal } from "./helpers/GetBlockNodeTerminal";
import { ShowHandle } from "./helpers";
import { IsProduct } from "../../../../helpers/Aspects";

interface Props {
  node: Node;
  terminals: Connector[];
  offPage?: boolean;
  isInput?: boolean;
  isParent?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
export const HandleComponent = ({ node, terminals, offPage, isInput, isParent }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const isElectro = useAppSelector(electroSelector);
  const [visible, setVisible] = useState(!offPage);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setTimeout(() => {
      updateNodeInternals(node?.id);
    }, 200);
  }, [isElectro, terminals]);

  return (
    <HandleContainer isElectro={isElectro}>
      {terminals.map((c) => {
        if (ShowHandle(c, isInput, IsProduct(node)))
          return GetBlockNodeTerminal(project, node, c, dispatch, isElectro, isParent, visible, setVisible);
      })}
    </HandleContainer>
  );
};
