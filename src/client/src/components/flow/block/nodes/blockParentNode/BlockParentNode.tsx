/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps, useZoomPanHelper } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnParentClick, OnChildClick } from "./handlers/";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector, blockElementsSelector } from "../../../../../redux/store";
import { SetParentNodeWidth } from "../../builders/helpers/SetParentNodeWidth";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { ResizeHandler } from "./handlers/ResizeHandler";
import { IsProduct } from "../../../../../helpers";
import { BlockNodeSize } from "../../../../../models/project";
import { Size } from "../../../../../compLibrary/size/Size";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { setCenter } = useZoomPanHelper();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const elements = useAppSelector(blockElementsSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const isProduct = IsProduct(node);
  let size = useAppSelector(selectors.nodeSizeSelector);
  if (isProduct) size = { width: Size.BLOCK_PRODUCT_WIDTH, height: Size.BLOCK_PRODUCT_HEIGHT } as BlockNodeSize;

  // Set default zoom on first render
  useEffect(() => {
    const marginTop = 70;
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2 - marginTop;
    setCenter(x, y, Size.DEFAULT_ZOOM_LEVEL);
  }, []);

  useEffect(() => {
    setTerminals(FilterBlockTerminals(node, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    if (!isProduct) SetParentNodeWidth(secondaryNode !== null, libOpen, explorerOpen, dispatch);
  }, [secondaryNode, libOpen, explorerOpen]);

  // Responsive resizing
  useEffect(() => {
    if (!isProduct) ResizeHandler(node, secondaryNode, libOpen, explorerOpen, elements, dispatch);
  }, [secondaryNode, libOpen, explorerOpen]);

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
