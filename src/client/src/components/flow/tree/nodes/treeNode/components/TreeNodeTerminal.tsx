import { GetHandleType } from "../../helpers/GetHandleType";
import { IsValidTreeConnection } from "../helpers/IsValidTreeConnection";
import { TreeHandleBox } from "../../styled/TreeHandleBox";
import { Handle } from "react-flow-renderer";
import { Dispatch } from "redux";
import { SetTopPos } from "../../helpers/SetTopPos";
import { Aspect, Connector, Node } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation } from "../../../../helpers/Connectors";
import { GetHandleClassName } from "../../helpers/GetHandleClassName";

interface Props {
  node: Node;
  connector: Connector;
  isHover: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch;
}

/**
 * Component for a TreeNode terminal. React Flow's terminal is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const TreeNodeTerminal = ({ node, connector, isHover, setIsHover, dispatch }: Props) => {
  const [type, pos] = GetHandleType(connector);
  const className = GetHandleClassName(connector);

  return (
    <TreeHandleBox
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      visible={(IsPartOfRelation(connector) || IsLocationRelation(connector) || IsProductRelation(connector)) && isHover}
      position={pos}
      topPos={SetTopPos(pos)}
      isFunctionAspect={node.aspect === Aspect.Function}
    >
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={className}
        isValidConnection={(connection) => IsValidTreeConnection(node, connection, dispatch)}
      />
    </TreeHandleBox>
  );
};
