/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../redux/store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "../../handle";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterTerminals } from "../helpers/FilterTerminals";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../compLibrary/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";
import { Terminals } from "../blockParentNode/BlockParentNode";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param data the data for the node.
 * @returns a Mimir Node.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialTerminals = { in: [], out: [] } as Terminals;
  const [terminals, setTerminals] = useState<Terminals>(initialTerminals);
  const initialSize = { width: Size.NODE_WIDTH, height: Size.NODE_HEIGHT } as BlockNodeSize;
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
    setTerminals(FilterTerminals(node?.connectors, selectedNode, secondaryNode));
  }, [selectedNode, secondaryNode, node?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    setSize(SetChildNodeSize(terminals.in, terminals.out, isElectro));
  }, [isElectro, terminals]);

  if (!node) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={terminals.in} isInput />
      <BlockChildComponent
        node={node}
        colorMain={GetAspectColor(node, AspectColorType.Main)}
        colorSelected={GetAspectColor(node, AspectColorType.Selected)}
        inputTerminals={terminals.in}
        outputTerminals={terminals.out}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node.id, dispatch, project.edges)}
      />
      <HandleComponent node={node} terminals={terminals.out} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
