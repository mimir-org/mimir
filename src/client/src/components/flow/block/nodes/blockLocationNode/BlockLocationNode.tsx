import { RootState } from "../../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { NodeBox } from "../../../styled";
import { BlockNodeNameBox } from "../../styled";
import { HandleComponent, TerminalsComponent } from "../../terminals";
import { useDispatch, useSelector } from "react-redux";
import { Node } from "../../../../../models";
import { OnHover, OnMouseOut, OnConnectorClick } from "./handlers";
import { FilterTerminals, GetNodeByDataId } from "../../helpers";
import { Symbol } from "../../../../../compLibrary/symbol";
import { Size } from "../../../../../compLibrary";

/**
 * Component for a Location Node in BlockView.
 * @param data the data for the node.
 * @returns a Location Node of the Flow node type with Mimir styling and functionality.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useSelector<RootState>((s) => s.projectState.project.nodes) as Node[];
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitNode = useSelector<RootState>((s) => s.splitView.node) as Node;
  const electro = useSelector<RootState>((s) => s.electro.visible) as boolean;
  const node = nodes.find((x) => x.id === data?.id);
  if (data) data.width = Size.Node_Width;

  // Enforce size change of node
  useEffect(() => {
    const locationNode = GetNodeByDataId(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  const updateNodeInternals = useUpdateNodeInternals();
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

        <TerminalsComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={FilterTerminals(data, splitView, splitNode)}
          parent={false}
          splitView={splitView}
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
        terminals={FilterTerminals(data, splitView, splitNode)}
        parent={false}
        splitView={splitView}
        electro={electro}
        mainConnectNode={false}
      />
    </>
  );
};

export default memo(BlockLocationNode);
