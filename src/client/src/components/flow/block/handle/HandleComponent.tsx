/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch } from "redux";
import { useEffect, useState } from "react";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./HandleComponent.styled";
import { BlockNodeConnector } from "./components/BlockNodeConnector";
import { ShowHandle } from "./helpers";
import { IsProduct } from "../../../../helpers/Aspects";
import { Project, Node, Connector } from "@mimirorg/modelbuilder-types";

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
          <BlockNodeConnector
            key={`handle-${conn.id}`}
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
