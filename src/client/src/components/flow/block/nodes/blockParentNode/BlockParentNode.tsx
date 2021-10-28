import { memo, FC, useState, useEffect } from "react";
import { Background, BackgroundVariant, NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Color } from "../../../../../compLibrary";
import { GetParentColor, SetParentNodeSize } from "./helpers";
import { OnConnectorClick } from "./handlers";
import { BlockComponent } from "./";
import { FilterTerminals } from "../../helpers";
import { Node } from "../../../../../models";
import { IsLocation } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, nodeSizeSelector, secondaryNodeSelector } from "../../../../../redux/store";

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
  const parentNodeSize = useAppSelector(nodeSizeSelector);
  const updateNodeInternals = useUpdateNodeInternals();
  const node = nodes?.find((x) => x.id === data.id);
  if (node) node.blockWidth = parentNodeSize?.width;

  const terminals = FilterTerminals(data, secondaryNode);

  useEffect(() => {
    updateNodeInternals(node?.id);
    updateNodeInternals(secondaryNode?.id);
  }, [node, secondaryNode, updateNodeInternals]);

  useEffect(() => {
    SetParentNodeSize(node, secondaryNode, dispatch); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondaryNode]);

  return (
    <>
      <BlockComponent
        dispatch={dispatch}
        node={node}
        color={GetParentColor(node)}
        selected={node?.isBlockSelected}
        width={parentNodeSize?.width}
        height={parentNodeSize?.height}
      />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        electro={electro}
        terminals={terminals}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        menuBox={true}
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
      />
      {IsLocation(data) && <Background style={{ zIndex: 1 }} variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
    </>
  );
};

export default memo(BlockParentNode);
