/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "../../handle/HandleComponent";
import { HandleConnectedOffPageNode } from "./helpers/HandleConnectedOffPageNode";
import { HandleRequiredOffPageNode } from "./helpers/HandleRequiredOffPageNode";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../assets/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";
import { Connectors } from "../blockParentNode/BlockParentNode";
import { Node } from "@mimirorg/modelbuilder-types";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param data the data for the node.
 * @returns a Mimir Node.
 */
const BlockNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialConnectors = { inputs: [], outputs: [] } as Connectors;
  const [connectors, setConnectors] = useState<Connectors>(initialConnectors);
  const initialSize = { width: Size.NODE_WIDTH, height: Size.NODE_HEIGHT } as BlockNodeSize;
  const [size, setSize] = useState<BlockNodeSize>(initialSize);
  const project = useAppSelector(selectors.projectSelector);
  const isElectroView = useAppSelector(selectors.electroSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const selectedBlockNode = project?.nodes?.find((n) => n.blockSelected);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(data, project?.nodes, project?.edges, size, dispatch);
    HandleRequiredOffPageNode(data, project?.edges, size, dispatch);
  }, [secondaryNode]);

  // Handle connectors
  useEffect(() => {
    setConnectors(FilterConnectors(data?.connectors, selectedBlockNode, secondaryNode));
  }, [selectedBlockNode, secondaryNode, data?.connectors]);

  // Update node size based on active connectors
  useEffect(() => {
    setSize(SetChildNodeSize(connectors, isElectroView));
  }, [isElectroView, connectors]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectroView}>
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.inputs}
        isElectroView={isElectroView}
        dispatch={dispatch}
        isInput
      />
      <BlockChildComponent
        node={data}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputConnectors={connectors.inputs}
        outputConnectors={connectors.outputs}
        onConnectorClick={(conn, isInput, data, isElectroView, isOffPage) =>
          OnConnectorClick(conn, isInput, data, dispatch, isElectroView, isOffPage)
        }
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.outputs}
        isElectroView={isElectroView}
        dispatch={dispatch}
        isInput={false}
      />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
