/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../../models";
import { HandleComponent } from "../../handle";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterTerminals } from "../helpers/FilterTerminals";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { Size } from "../../../../../compLibrary/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetNodeSize } from "./helpers/SetNodeSize";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";

/**
 * Component for a child Node in BlockView.
 * @param data the data for the node.
 * @returns a child Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const initialSize = { width: Size.BLOCK_CHILD_NODE_WIDTH, height: Size.BLOCK_CHILD_NODE_HEIGHT } as BlockNodeSize;
  const [size, setSize] = useState<BlockNodeSize>(initialSize);

  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const isElectro = useAppSelector(selectors.electroSelector);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(node, edges, size, dispatch);
    HandleRequiredOffPageNode(node, edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterTerminals(node, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const updatedSize = SetNodeSize(terminals, electro);
    setSize({ width: updatedSize.width, height: updatedSize.height });
  }, [electro, terminals]);

  if (!node) return null;

  const inputTerminals = terminals.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputTerminals = terminals.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockChildComponent
        node={node}
        colorMain={GetAspectColor(node, AspectColorType.Main)}
        colorSelected={GetAspectColor(node, AspectColorType.Selected)}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node, dispatch, edges)}
      />
      <HandleComponent node={node} terminals={outputTerminals} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
