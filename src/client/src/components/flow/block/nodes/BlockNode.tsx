import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { AspectColorType, Connector } from "../../../../models";
import { NodeBox } from "../../styled";
import { TerminalsContainerComponent, HandleComponent } from "../terminals";
import { GetBlockNodeType, SetNodeSize } from "./helpers";
import { FilterTerminals } from "../helpers";
import { OnHover, OnMouseOut, OnTerminalClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../redux/store";
import { Size } from "../../../../compLibrary/size";
import { BlockLogoComponent } from "../logo";
import { GetAspectColor, GetSelectedBlockNode, IsProduct } from "../../../../helpers";

/**
 * Component for a child Node in BlockView.
 * @param data the data for the node.
 * @returns a child Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminalBox, showTerminalBox] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const [width, setWidth] = useState(Size.Node_Width);
  const [height, setHeight] = useState(Size.Node_Height);

  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const electro = useAppSelector(electroSelector);
  const type = GetBlockNodeType(data);
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const size = SetNodeSize(terminals, electro);
    setWidth(size.width);
    setHeight(size.height);
  }, [electro, terminals]);

  useEffect(() => {
    updateNodeInternals(node?.id);
  });

  if (!node) return null;

  node.width = width;
  node.height = height;

  return (
    <NodeBox
      id={type + node.id}
      product={IsProduct(node)}
      width={node.width}
      height={node.height}
      visible={!node.isHidden}
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={node === GetSelectedBlockNode()}
      onMouseOver={() => OnHover(showTerminalBox)}
      onMouseOut={() => OnMouseOut(showTerminalBox)}
    >
      <BlockLogoComponent node={node} />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        terminals={terminals}
        parent={false}
        electro={electro}
        onClick={(conn) => OnTerminalClick(conn, node, dispatch, edges)}
        showMenuBox={terminalBox}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        nodes={nodes}
        height={node.height}
        width={node.width}
        terminals={terminals}
        isParent={false}
        electro={electro}
        dispatch={dispatch}
      />
    </NodeBox>
  );
};

export default memo(BlockNode);
