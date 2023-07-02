/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useUpdateNodeInternals } from "react-flow-renderer";
import { HandleContainer } from "./BlockNode.styled";
import { BlockNodeConnector } from "./BlockNodeConnector";
import { AspectObject, Connector } from "lib";

interface Props {
  node: AspectObject;
  connectors: Connector[];
  isElectroView: boolean;
}

/**
 * Component for the connectors displayed on the nodes in BlockView.
 * @param interface
 * @returns a Flow Handle element with an icon that corresponds with the connector type.
 */
export const HandleComponent = ({ node, connectors, isElectroView }: Props) => {
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
        return <BlockNodeConnector key={`handle-${conn.id}`} connector={conn} isElectroView={isElectroView} visible={true} />;
      })}
    </HandleContainer>
  );
};
