/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps, useZoomPanHelper } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnParentClick, OnChildClick } from "./handlers/";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { Connector, Node } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { SetZoomCenterLevel } from "./helpers/SetZoomCenterLevel";
import { Size } from "../../../../../compLibrary/size";
import { Dispatch } from "redux";
import { updateBlockSize } from "../../../../../redux/store/project/actions";

/**
 * Component for a ParentNode in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowParentNode.
 * @param data the data for the node.
 * @returns a Mimir ParentNode.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { setCenter } = useZoomPanHelper();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const nodes = useAppSelector(selectors.nodesSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    const canvasData = SetZoomCenterLevel(secondaryNode !== null);
    setCenter(canvasData.x, canvasData.y, canvasData.zoom);
  }, [setCenter, secondaryNode]);

  useEffect(() => {
    InitParentSize(node, dispatch);
  }, []);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  if (!node) return null;

  const inputTerminals = terminals.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputTerminals = terminals.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockParentComponent
        node={node}
        splitView={secondaryNode !== null}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        isNavigationActive={node.id !== secondaryNode?.id}
        onNavigateUpClick={() => OnParentClick(dispatch, node)}
        onNavigateDownClick={() => OnChildClick(dispatch, node, nodes, edges)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node, dispatch, edges)}
      />
      <HandleComponent node={node} terminals={outputTerminals} />
    </BoxWrapper>
  );
};

/**
 * Function to ensure that the ParentNode size has been initialized.
 * @param node
 * @param dispatch
 */
function InitParentSize(node: Node, dispatch: Dispatch) {
  if (
    node?.width == null ||
    node?.height === null ||
    node?.width === undefined ||
    node?.height === undefined ||
    node?.width < Size.BLOCK_NODE_MIN_WIDTH ||
    node?.height < Size.BLOCK_NODE_MIN_HEIGHT
  )
    dispatch(updateBlockSize(node.id, { width: Size.BLOCK_NODE_WIDTH, height: Size.BLOCK_NODE_HEIGHT }));
}

export default memo(BlockParentNode);
