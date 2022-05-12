import { Connector, Node } from "../../../../../../models";
import { GetHandleType } from "../../helpers/GetHandleType";
import { IsValidTreeConnection } from "./IsValidTreeConnection";
import { TreeHandleBox } from "../../styled/TreeHandleBox";
import { Handle } from "react-flow-renderer";
import { IsPartOfTerminal } from "../../../../helpers/Connectors";
import { Dispatch } from "redux";
import { SetTopPos } from "../../helpers/SetTopPos";

/**
 * Component to get a single terminal for a Node in TreeView.
 * This component is called in a loop from the TreeNode component.
 * @param node
 * @param connector
 * @param dispatch
 * @param setIsHover
 * @param isHover
 * @returns a terminal.
 */
export const GetTreeNodeTerminal = (
  node: Node,
  connector: Connector,
  dispatch: Dispatch,
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>,
  isHover: boolean
) => {
  const [type, pos] = GetHandleType(connector);

  return (
    <TreeHandleBox
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      key={`handle-treeview-${connector.id}`}
      visible={IsPartOfTerminal(connector) && isHover}
      position={pos}
      topPos={SetTopPos(pos)}
    >
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className="function-treeview-handler"
        isValidConnection={(connection) => IsValidTreeConnection(node, connection, dispatch)}
      />
    </TreeHandleBox>
  );
};