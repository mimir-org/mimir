import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { NodeBox } from "../../../styled";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { AspectColorType, Connector } from "../../../../../models";
import { OnHover, OnMouseOut, OnConnectorClick } from "./handlers";
import { FilterTerminals } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";
import { BlockLogoComponent } from "../../logo";
import { GetAspectColor, GetSelectedBlockNode } from "../../../../../helpers";

/**
 * Component for a Location Node in BlockView.
 * @param data the data for the node.
 * @returns a Location Node of the Flow node type with Mimir styling and functionality.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminalBox, showTerminalBox] = useState(false);
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useAppSelector(nodeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector);
  const electro = useAppSelector(electroSelector);
  const node = nodes.find((x) => x.id === data?.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    updateNodeInternals(node?.id);
  });

  if (!node) return null;

  return (
    <NodeBox
      id={"BlockLocationNode-" + node.id}
      width={node.width}
      length={node.length}
      product={false}
      visible={!node.isHidden}
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={node === GetSelectedBlockNode()}
      onMouseOver={() => OnHover(showTerminalBox)}
      onMouseOut={() => OnMouseOut(showTerminalBox)}
    >
      <BlockLogoComponent node={node} parent={false} />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        terminals={terminals}
        parent={false}
        electro={electro}
        onClick={(conn) => OnConnectorClick(conn, node, dispatch)}
        showMenuBox={terminalBox}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />

      <HandleComponent
        nodes={nodes}
        length={node.length}
        width={node.width}
        terminals={terminals}
        parent={false}
        electro={electro}
      />
    </NodeBox>
  );
};

export default memo(BlockLocationNode);
