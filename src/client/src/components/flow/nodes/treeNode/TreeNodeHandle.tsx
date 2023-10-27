import { TreeHandleBox } from "../aspectNode/TreeHandleBox";
import { Handle } from "react-flow-renderer";
import { Block, Connector, ViewType } from "lib";

interface Props {
  node: Block;
  connector: Connector;
}

/**
 * Component for a TreeNode connector. React Flow's connector is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const TreeNodeHandle = ({ node, connector }: Props) => {
  const flowHandles = connector.getFlowtHandles(node.aspect, ViewType.Tree);

  return (
    <>
      {flowHandles &&
        flowHandles.map((x) => {
          return (
            <TreeHandleBox key={x.id} hidden={x.hidden} position={x.position}>
              <Handle type={x.handleType} position={x.position} id={x.id} className={x.className} />
            </TreeHandleBox>
          );
        })}
    </>
  );
};
