/* eslint-disable react-hooks/exhaustive-deps */
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
import { Size } from "../../../../../compLibrary/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param data the data for the node.
 * @returns a Mimir Node.
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

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(node, edges, size, dispatch);
    HandleRequiredOffPageNode(node, edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    const updatedSize = SetChildNodeSize(terminals, isElectro);
    setSize(updatedSize);
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
