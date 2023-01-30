/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import {
  libNodesSelector,
  projectSelector,
  terminalsSelector,
  useAppDispatch,
  useAppSelector,
  electroViewSelector,
} from "../../../../../redux/store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "../../handle/HandleComponent";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../assets/size/Size";
import { GetAspectColor } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";
import { Connectors } from "../blockParentNode/BlockParentNode";
import { Node, ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { useOnAddTerminal, useOnRemoveTerminal } from "../../hooks";
import { IsTerminal } from "../../../../../services";

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
  const [, setSize] = useState<BlockNodeSize>(initialSize);
  const project = useAppSelector(projectSelector);
  const isElectroView = useAppSelector(electroViewSelector);
  const selectedBlockNode = project?.nodes?.find((n) => n.blockSelected);
  const terminalTypes = useAppSelector(terminalsSelector);
  const libNodes = useAppSelector(libNodesSelector);

  const OnClickAddTerminal = (typeId: string, nodeId: string, direction: ConnectorDirection) => {
    return useOnAddTerminal(project, typeId, nodeId, terminalTypes, libNodes, direction, dispatch);
  };

  const OnClickRemoveTerminal = (nodeId: string, terminalId: string) => {
    return useOnRemoveTerminal(project, terminalId, nodeId, dispatch);
  };

  // Handle connectors
  useEffect(() => {
    setConnectors(
      FilterConnectors(
        data?.connectors.filter((x) => IsTerminal(x) && !x.isProxy),
        selectedBlockNode
      )
    );
  }, [selectedBlockNode, data?.connectors]);

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
        isElectroView={isElectroView}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputConnectors={connectors.inputs}
        outputConnectors={connectors.outputs}
        onConnectorClick={(conn, isInput, data) => OnConnectorClick(conn, isInput, data, dispatch, project?.edges)}
        onClickAddTerminal={OnClickAddTerminal}
        onClickRemoveTerminal={OnClickRemoveTerminal}
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
