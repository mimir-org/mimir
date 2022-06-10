/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "../../handle";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterTerminals } from "../helpers/FilterTerminals";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../assets/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";
import { Terminals } from "../blockParentNode/BlockParentNode";
import { Node } from "@mimirorg/modelbuilder-types";

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
  const selectedBlockNode = project?.nodes?.find((n) => n.blockSelected);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(data, project?.nodes, project?.edges, size, dispatch);
    HandleRequiredOffPageNode(data, project?.edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterTerminals(data?.connectors, selectedBlockNode, secondaryNode));
  }, [selectedBlockNode, secondaryNode, data?.connectors]);

  // Update node size based on active terminals
  useEffect(() => {
    setSize(SetChildNodeSize(terminals, isElectro));
  }, [isElectro, terminals]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent
        node={data}
        project={project}
        terminals={terminals.inputs}
        isElectro={isElectro}
        dispatch={dispatch}
        isInput
      />
      <BlockChildComponent
        node={data}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputTerminals={terminals.inputs}
        outputTerminals={terminals.outputs}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data.id, dispatch)}
      />
      <HandleComponent node={data} project={project} terminals={terminals.outputs} isElectro={isElectro} dispatch={dispatch} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
