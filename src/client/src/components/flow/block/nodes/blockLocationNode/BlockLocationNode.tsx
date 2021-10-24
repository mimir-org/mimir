import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { NodeBox } from "../../../styled";
import { BlockNodeNameBox } from "../../styled";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Node } from "../../../../../models";
import { OnHover, OnMouseOut, OnConnectorClick } from "./handlers";
import { FilterTerminals, GetNodeByDataId } from "../../helpers";
import { Symbol } from "../../../../../compLibrary/symbol";
import { Size } from "../../../../../compLibrary";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";

/**
 * Component for a Location Node in BlockView.
 * @param data the data for the node.
 * @returns a Location Node of the Flow node type with Mimir styling and functionality.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useAppSelector(nodeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const electro = useAppSelector(electroSelector);
  const node = nodes.find((x) => x.id === data?.id);
  const terminals = FilterTerminals(data, secondaryNode);
  if (data) data.width = Size.Node_Width;

  // Enforce size change of node
  useEffect(() => {
    const locationNode = GetNodeByDataId(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  useEffect(() => {
    updateNodeInternals(node?.id);
  }, [node, updateNodeInternals]);

  return (
    <>
      <NodeBox
        id={"BlockLocationNode-" + data.id}
        width={data?.width}
        length={data?.length}
        product={false}
        onMouseOver={() => OnHover(showTerminalButton)}
        onMouseOut={() => OnMouseOut(showTerminalButton)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsContainerComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={terminals}
          parent={false}
          electro={electro}
          onClick={(conn) => OnConnectorClick(conn, data, dispatch)}
          menuBox={terminalButton}
          mainConnectNode={false}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
      </NodeBox>

      <HandleComponent
        node={data}
        nodes={nodes}
        length={data?.length}
        width={data?.width}
        terminals={terminals}
        parent={false}
        electro={electro}
        mainConnectNode={false}
      />
    </>
  );
};

export default memo(BlockLocationNode);
