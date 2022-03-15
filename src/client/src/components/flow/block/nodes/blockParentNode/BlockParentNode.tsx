/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps, useZoomPanHelper } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnParentClick, OnChildClick } from "./handlers/";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { SetZoomCenterLevel } from "./helpers/SetZoomCenterLevel";

/**
 * Component for a ParentNode in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { setCenter } = useZoomPanHelper();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const size = useAppSelector(selectors.nodeSizeSelector);

  useEffect(() => {
    const canvasData = SetZoomCenterLevel(secondaryNode !== null);
    setCenter(canvasData.x, canvasData.y, canvasData.zoom);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  if (!node) return null;

  const inputTerminals = terminals.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputTerminals = terminals.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockParentComponent
        node={node}
        size={size}
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

export default memo(BlockParentNode);
