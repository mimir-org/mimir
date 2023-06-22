import { TreeHandleBox } from "../aspectNode/TreeHandleBox";
import { Handle, Position } from "react-flow-renderer";
import { AspectObject, Aspect, Connector, ConnectorPartOf, ConnectorHasLocation, ConnectorFulfilledBy, ViewType } from "lib";

interface Props {
  node: AspectObject;
  connector: Connector;
}

/**
 * Component for a TreeNode terminal. React Flow's terminal is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const TreeNodeTerminal = ({ node, connector }: Props) => {
  const [type, pos] = connector.GetHandleType();
  const visible =
    connector instanceof ConnectorPartOf ||
    connector instanceof ConnectorHasLocation ||
    connector instanceof ConnectorFulfilledBy;

  const SetTopPos = (position: Position) => {
    if (position === Position.Top) return "-20px";
    if (position === Position.Right || position === Position.Left) return "50%";
  };

  return (
    <TreeHandleBox visible={visible} position={pos} topPos={SetTopPos(pos)} isFunctionAspect={node.aspect === Aspect.Function}>
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={connector.getClassName(node.aspect, ViewType.Tree)}
        isValidConnection={(connection) => true}
      />
    </TreeHandleBox>
  );
};
