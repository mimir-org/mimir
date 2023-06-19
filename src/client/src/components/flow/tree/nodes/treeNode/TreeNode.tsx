/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType } from "../../../../../models";
import { TreeNodeBox } from "./TreeNode.styled";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "assets";
import { TreeNodeTerminal } from "./components/TreeNodeTerminal";
import { AspectObject } from "lib";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  if (data == null) return null;

  return (
    <TreeNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      selected={data.selected}
      visible={!data.hidden}
    >
      {data.connectors &&
        data.connectors.map((connector) => {
          return <TreeNodeTerminal key={`handle-${connector.id}`} node={data} connector={connector} />;
        })}
      <TreeLogoComponent node={data} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
