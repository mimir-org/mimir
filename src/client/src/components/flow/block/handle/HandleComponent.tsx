/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Connector, Node, Project } from "../../../../models";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./HandleComponent.styled";
import { GetBlockNodeTerminal } from "./helpers/GetBlockNodeTerminal";
import { ShowHandle } from "./helpers";
import { IsProduct } from "../../../../helpers/Aspects";
import { Dispatch } from "redux";

interface Props {
  node: Node;
  project: Project;
  terminals: Connector[];
  isElectro: boolean;
  dispatch: Dispatch;
  offPage?: boolean;
  isInput?: boolean;
  isParent?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
export const HandleComponent = ({ node, project, terminals, isElectro, offPage, isInput, isParent, dispatch }: Props) => {
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
        if (!ShowHandle(c, isInput, IsProduct(node))) return null;
        return GetBlockNodeTerminal(project, node, c, dispatch, isElectro, isParent, visible, setVisible);
      })}
    </HandleContainer>
  );
};
