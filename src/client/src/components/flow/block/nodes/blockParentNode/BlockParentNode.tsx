/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnParentClick, OnChildClick } from "./handlers/";
import { FilterTerminals } from "../helpers/FilterTerminals";
import { Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector, blockElementsSelector } from "../../../../../redux/store";
import { SetParentNodeWidth } from "../../builders/helpers/SetParentNodeWidth";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { ResizeHandler } from "./handlers/ResizeHandler";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminals, setTerminals] = useState<Connector[]>([]);

  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const elements = useAppSelector(blockElementsSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const isElectro = useAppSelector(selectors.electroSelector);

  useEffect(() => {
    setTerminals(FilterTerminals(node, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    SetParentNodeWidth(secondaryNode !== null, libOpen, explorerOpen, dispatch);
  }, [secondaryNode, libOpen, explorerOpen]);

  // Responsive resizing
  useEffect(() => {
    ResizeHandler(node, secondaryNode, libOpen, explorerOpen, elements, dispatch);
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
