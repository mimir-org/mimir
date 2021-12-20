/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/BlockNodeSelectors";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../models";
import { NodeBox } from "../../styled";
import { TerminalsMenuComponent, HandleComponent } from "../terminals";
import { AddRequiredOffPageNode, AddConnectedOffPageNode } from "./helpers/offPage";
import { FilterTerminals } from "../helpers";
import { OnHover, OnMouseOut, OnTerminalClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { Size } from "../../../../compLibrary/size";
import { BlockLogoComponent } from "../logo";
import { GetAspectColor, GetSelectedBlockNode } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";
import { GetBlockNodeType, SetNodeSize } from "./helpers";

/**
 * Component for a child Node in BlockView.
 * @param data the data for the node.
 * @returns a child Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [showInputMenu, setShowInputMenu] = useState(false);
  const [showOutputMenu, setShowOutputMenu] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const initialSize = { width: Size.Node_Width, height: Size.Node_Height } as BlockNodeSize;
  const [size, setSize]: [BlockNodeSize, any] = useState(initialSize);

  const nodes = useAppSelector(selectors.nodeSelector);
  const edges = useAppSelector(selectors.edgeSelector);
  const blockElements = useAppSelector(selectors.blockElementsSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const electro = useAppSelector(selectors.electroSelector);
  const type = GetBlockNodeType(data);
  const node = nodes?.find((x) => x.id === data.id);
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  // Check for elements that require OffPage
  // useEffect(() => {
  //   AddRequiredOffPageNode(node, edges, size, dispatch);
  //   AddConnectedOffPageNode(node, edges, size, blockElements, secondaryNode, dispatch);
  // }, []);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const updatedSize = SetNodeSize(terminals, electro);
    setSize({ width: updatedSize.width, height: updatedSize.height });
  }, [electro, terminals]);

  if (!node) return null;

  node.width = size.width;
  node.height = size.height;

  return (
    <NodeBox
      id={type + node.id}
      node={node}
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={node === GetSelectedBlockNode()}
      onMouseEnter={() => OnHover(setShowMenuButton)}
      onMouseLeave={() => OnMouseOut(setShowMenuButton)}
    >
      <BlockLogoComponent node={node} />
      <TerminalsMenuComponent
        node={node}
        terminals={terminals}
        size={size}
        showInputMenu={showInputMenu}
        showOutputMenu={showOutputMenu}
        setShowInputMenu={setShowInputMenu}
        setShowOutputMenu={setShowOutputMenu}
        electro={electro}
        onClick={(conn) => OnTerminalClick(conn, node, dispatch, edges)}
        showMenuButton={showMenuButton}
      />
      {hasActiveTerminals && (
        <HandleComponent node={node} size={size} terminals={terminals} electro={electro} dispatch={dispatch} />
      )}
    </NodeBox>
  );
};

export default memo(BlockNode);
