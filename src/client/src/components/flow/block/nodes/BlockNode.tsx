import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
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
import { GetAspectColor, GetSelectedBlockNode } from "../../../../helpers";

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

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const electro = useAppSelector(electroSelector);
  const type = GetBlockNodeType(data);
  const node = nodes?.find((x) => x.id === data.id);
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const size = SetNodeSize(terminals, electro);
    setWidth(size.width);
    setHeight(size.height);
  }, [electro, terminals]);

  if (!node) return null;

  node.width = width;
  node.height = height;

  return (
    <NodeBox
      id={type + node.id}
      node={node}
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={node === GetSelectedBlockNode()}
      onMouseEnter={() => OnHover(showTerminalBox)}
      onMouseLeave={() => OnMouseOut(showTerminalBox)}
    >
      <BlockLogoComponent node={node} />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        terminals={terminals}
        electro={electro}
        onClick={(conn) => OnTerminalClick(conn, node, dispatch, edges)}
        showMenuBox={terminalBox}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      {hasActiveTerminals && (
        <HandleComponent nodes={nodes} node={node} terminals={terminals} electro={electro} dispatch={dispatch} />
      )}
    </NodeBox>
  );
};

export default memo(BlockNode);
