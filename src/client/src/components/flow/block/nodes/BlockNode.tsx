/* eslint-disable react-hooks/exhaustive-deps */
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../models";
import { NodeBox } from "../../styled";
import { TerminalsMenuComponent, HandleComponent } from "../terminals";
import { HasOffPageNode, CreateOffPageNode, GetBlockNodeType, SetNodeSize } from "./helpers";
import { FilterTerminals } from "../helpers";
import { OnHover, OnMouseOut, OnTerminalClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../redux/store";
import { Size } from "../../../../compLibrary/size";
import { BlockLogoComponent } from "../logo";
import { GetAspectColor, GetSelectedBlockNode } from "../../../../helpers";
import { BlockNodeSize } from "../../../../models/project";

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

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const electro = useAppSelector(electroSelector);
  const type = GetBlockNodeType(data);
  const node = nodes?.find((x) => x.id === data.id);
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  // Check for connectors that require OffPage
  useEffect(() => {
    node?.connectors.forEach((conn) => {
      if (conn.isRequired) {
        const offPageExists = HasOffPageNode(edges, conn);
        if (!offPageExists) CreateOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, dispatch, true);
      }
    });
  }, []);

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
        <HandleComponent nodes={nodes} node={node} size={size} terminals={terminals} electro={electro} dispatch={dispatch} />
      )}
    </NodeBox>
  );
};

export default memo(BlockNode);
