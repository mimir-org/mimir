/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { Connector, Node, Project } from "../../../../models";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./HandleComponent.styled";
import { BlockNodeTerminal } from "./components/BlockNodeTerminal";
import { ShowHandle } from "./helpers";
import { IsProduct } from "../../../../helpers/Aspects";

interface Props {
  node: Node;
  project: Project;
  terminals: Connector[];
  isElectro: boolean;
  dispatch: Dispatch;
  isOffPage?: boolean;
  isInput?: boolean;
  isParent?: boolean;
}

/**
 * Component for the terminals displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the terminal type.
 */
export const HandleComponent = ({ node, project, terminals, isElectro, isOffPage, isInput, isParent, dispatch }: Props) => {
  const [visible, setVisible] = useState(!isOffPage);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setTimeout(() => {
      updateNodeInternals(node?.id);
    }, 200);
  }, [isElectro, terminals]);

  return (
    <HandleContainer isElectro={isElectro}>
      {terminals.map((conn) => {
        if (!ShowHandle(conn, isInput, IsProduct(node))) return null;
        return (
          <BlockNodeTerminal
            project={project}
            node={node}
            connector={conn}
            dispatch={dispatch}
            isElectro={isElectro}
            isParent={isParent}
            visible={visible}
            setVisible={setVisible}
          />
        );
      })}
    </HandleContainer>
  );
};
