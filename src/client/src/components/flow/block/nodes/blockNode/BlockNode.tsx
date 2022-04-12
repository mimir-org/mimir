/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers/Connectors";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../redux/store";
import { AspectColorType, Connector } from "../../../../../models";
import { HandleComponent } from "../../handle";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../compLibrary/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
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
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const selectedNode = project?.nodes.find((n) => n.selected);
  const isElectro = useAppSelector(selectors.electroSelector);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(node, project, size, dispatch);
    HandleRequiredOffPageNode(node, project.edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node?.connectors, selectedNode, secondaryNode));
  }, [selectedNode, secondaryNode, node?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    const updatedSize = SetChildNodeSize(terminals, isElectro);
    setSize(updatedSize);
  }, [isElectro, terminals]);

  if (!node) return null;

  const inputTerminals = node.connectors.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputTerminals = node.connectors.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockChildComponent
        node={node}
        colorMain={GetAspectColor(node, AspectColorType.Main)}
        colorSelected={GetAspectColor(node, AspectColorType.Selected)}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node.id, dispatch, project.edges)}
      />
      <HandleComponent node={node} terminals={outputTerminals} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
