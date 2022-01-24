/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ProductSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../terminals";
import { OnConnectorClick, ResizeHandler } from "./handlers";
import { BlockParentComponent } from "./parentContainer";
import { FilterTerminals } from "../helpers";
import { Connector } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { OnChildClick, OnParentClick } from "./parentContainer/handlers";
import { SetParentNodeSize } from "./helpers";
import { IsInputTerminal, IsOutputTerminal, IsPartOf } from "../../helpers";
import { BoxWrapper } from "./styled";

/**
 * Component for a parent Product Node in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentProductNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminals, setTerminals] = useState<Connector[]>([]);

  const elements = useAppSelector(selectors.blockElementsSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const isElectro = useAppSelector(selectors.electroSelector);

  // Set size
  useEffect(() => {
    SetParentNodeSize(false, libOpen, explorerOpen, dispatch);
  }, [libOpen, explorerOpen]);

  // Responsive resizing
  useEffect(() => {
    ResizeHandler(node, null, libOpen, explorerOpen, elements, dispatch);
  }, [libOpen, explorerOpen]);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, null));
  }, [node]);

  const inputTerminals = terminals.filter((t) => !IsPartOf(t) && IsInputTerminal(t));
  const outputTerminals = terminals.filter((t) => !IsPartOf(t) && IsOutputTerminal(t));

  if (!node) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockParentComponent
        node={node}
        size={size}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onNavigateUpClick={() => OnParentClick(dispatch, node)}
        onNavigateDownClick={() => OnChildClick(dispatch, node, nodes, edges)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node, dispatch, edges)}
        isNavigationActive
      />
      <HandleComponent node={node} terminals={outputTerminals} />
    </BoxWrapper>
  );
};

export default memo(BlockParentProductNode);
