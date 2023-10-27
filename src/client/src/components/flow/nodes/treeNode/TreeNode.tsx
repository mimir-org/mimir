/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { TreeNodeBox } from "./TreeNode.styled";
import { TreeLogoComponent } from "./TreeLogoComponent";
import { TreeNodeHandle } from "./TreeNodeHandle";
import { Block } from "lib";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Block>> = ({ data }) => {
  if (data == null) return null;
  const connectors = data.getTreeviewConnectors() ?? [];

  return (
    <TreeNodeBox
      colorMain={data.aspectColor.mainColor}
      colorSelected={data.aspectColor.selectedColor}
      selected={data.selected}
      hidden={data.hidden}
    >
      {connectors.map((connector) => {
        return <TreeNodeHandle key={`handle-${connector.id}`} node={data} connector={connector} />;
      })}
      <TreeLogoComponent node={data} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
