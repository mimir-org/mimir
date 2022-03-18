import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../../models";
import { HandleComponent } from "../../handle";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../redux/store";
import { Size } from "../../../../../compLibrary/size";
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
  const initialSize: BlockNodeSize = { width: Size.NODE_WIDTH, height: Size.NODE_HEIGHT };
  const [size, setSize] = useState<BlockNodeSize>(initialSize);
  const node = useParametricAppSelector(selectors.nodeSelector, data.id);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const splitView = secondaryNode !== null;

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(node, edges, size, splitView, dispatch);
    HandleRequiredOffPageNode(node, edges, size, splitView, dispatch);
  }, [dispatch, edges, node, secondaryNode, size, splitView]);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    const updatedSize = SetNodeSize(terminals, isElectro);
    setSize({ width: updatedSize.width, height: updatedSize.height });
  }, [isElectro, terminals]);

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
