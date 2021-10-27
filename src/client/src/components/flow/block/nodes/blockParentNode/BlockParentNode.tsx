import { memo, FC, useState, useEffect } from "react";
import { Background, BackgroundVariant, NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Color, Size } from "../../../../../compLibrary";
import { GetParentColor } from "./helpers";
import { OnConnectorClick } from "./handlers";
import { BlockComponent } from "./";
import { FilterTerminals, GetNodeByDataId } from "../../helpers";
import { Node } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";
import { IsLocation } from "../../../helpers";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const electro = useAppSelector(electroSelector);
  const updateNodeInternals = useUpdateNodeInternals();
  const node = nodes?.find((x) => x.id === data.id);
  if (node) node.width = Size.BlockView_Width;
  const terminals = FilterTerminals(data, secondaryNode);

  // Enforce size change of node
  useEffect(() => {
    const parentNode = GetNodeByDataId(data.id);
    parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data]);

  useEffect(() => {
    updateNodeInternals(node?.id);
    updateNodeInternals(secondaryNode?.id);
  }, [node, secondaryNode, updateNodeInternals]);

  return (
    <>
      <BlockComponent dispatch={dispatch} node={node} color={GetParentColor(node)} selected={node?.isBlockSelected} />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        electro={electro}
        terminals={terminals}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        menuBox={true}
        mainConnectNode={false}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        node={node}
        parent={true}
        nodes={nodes}
        length={node?.length}
        width={node?.width}
        terminals={terminals}
        electro={electro}
        connectNode={false}
      />
      {IsLocation(data) && <Background style={{ zIndex: 1 }} variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
    </>
  );
};

export default memo(BlockParentNode);
