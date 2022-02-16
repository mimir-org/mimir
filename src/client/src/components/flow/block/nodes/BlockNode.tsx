/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../models";
import { HandleComponent } from "../terminals";
import { HandleConnectedOffPageNode, HandleRequiredOffPageNode } from "./helpers/offPage";
import { FilterTerminals } from "../helpers";
import { OnConnectorClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { Size } from "../../../../compLibrary/size";
import { GetAspectColor } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";
import { SetNodeSize } from "./helpers";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal, IsPartOf } from "../../helpers";
import { BoxWrapper } from "./styled";
import { BlockChildComponent } from "./childContainer";

/**
 * Component for a child Node in BlockView.
 * @param data the data for the node.
 * @returns a child Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const initialSize = { width: Size.Node_Width, height: Size.Node_Height } as BlockNodeSize;
  const [size, setSize] = useState<BlockNodeSize>(initialSize);

  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const node = nodes?.find((x) => x.id === data.id);
  const isElectro = useAppSelector(selectors.electroSelector);

  // Check for elements that require OffPage nodes
  useEffect(() => {
    HandleConnectedOffPageNode(node, edges, size, dispatch);
    HandleRequiredOffPageNode(node, edges, size, dispatch);
  }, [secondaryNode]);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const updatedSize = SetNodeSize(terminals, electro);
    setSize({ width: updatedSize.width, height: updatedSize.height });
  }, [electro, terminals]);

  if (!node) return null;

  const inputTerminals = terminals.filter((t) => !IsPartOf(t) && (IsInputTerminal(t) || IsBidirectionalTerminal(t)));
  const outputTerminals = terminals.filter((t) => !IsPartOf(t) && (IsOutputTerminal(t) || IsBidirectionalTerminal(t)));

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={node} terminals={inputTerminals} isInput />
      <BlockChildComponent
        node={node}
        colorMain={GetAspectColor(node, AspectColorType.Main)}
        colorSelected={GetAspectColor(node, AspectColorType.Selected)}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node, dispatch, edges)}
      />
      <HandleComponent node={node} terminals={outputTerminals} />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
