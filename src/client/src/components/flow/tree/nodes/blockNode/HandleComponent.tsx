/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch } from "redux";
import { useEffect } from "react";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./BlockNode.styled";
import { BlockNodeConnector } from "./BlockNodeConnector";
import { AspectObject, Connector, Project } from "lib";

interface Props {
  node: AspectObject;
  project: Project;
  connectors: Connector[];
  isElectroView: boolean;
  dispatch: Dispatch;
  isInput: boolean;
  isParent?: boolean;
}

/**
 * Component for the connectors displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the connector type.
 */
export const HandleComponent = ({ node, project, connectors, isElectroView, isInput, dispatch, isParent }: Props) => {
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setTimeout(() => {
      updateNodeInternals(node?.id);
    }, 200);
  }, [isElectroView, connectors]);

  return (
    <HandleContainer isElectro={isElectroView}>
      {connectors.map((conn) => {
        if (conn.hidden) return null;
        return (
          <BlockNodeConnector
            key={`handle-${conn.id}`}
            project={project}
            node={node}
            connector={conn}
            dispatch={dispatch}
            isElectroView={isElectroView}
            isParent={isParent}
            visible={true}
          />
        );
      })}
    </HandleContainer>
  );
};
