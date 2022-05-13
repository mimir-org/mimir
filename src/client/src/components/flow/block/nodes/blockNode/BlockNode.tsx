/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { AspectColorType, Node } from "../../../../../models";
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
const BlockNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialTerminals = { inputs: [], outputs: [] } as Terminals;
  const [terminals, setTerminals] = useState<Terminals>(initialTerminals);
  const initialSize = { width: Size.NODE_WIDTH, height: Size.NODE_HEIGHT } as BlockNodeSize;
  const [size, setSize] = useState<BlockNodeSize>(initialSize);
  const project = useAppSelector(selectors.projectSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const selectedNode = project?.nodes?.find((n) => n.selected);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(data, project?.nodes, project?.edges, size, dispatch);
    HandleRequiredOffPageNode(data, project?.edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterTerminals(data?.connectors, selectedNode, secondaryNode));
  }, [selectedNode, secondaryNode, data?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    setSize(SetChildNodeSize(terminals, isElectro));
  }, [isElectro, terminals]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={data} terminals={terminals.inputs} isInput />
      <BlockChildComponent
        node={data}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputTerminals={terminals.inputs}
        outputTerminals={terminals.outputs}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data.id, dispatch)}
      />
      <HandleComponent node={data} terminals={terminals.outputs} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
