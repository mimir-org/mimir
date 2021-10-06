import { memo, FC, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Connector, Node, Edge } from "../../../../models";
import { NodeBox } from "../../styled";
import { OnHover, OnMouseOut } from "./handlers";
import { TerminalsComponent, HandleComponent } from "../../block/terminals";
import { changeActiveConnector, removeEdge } from "../../../../redux/store/project/actions";
import { SetTerminalOrder, FilterTerminals } from "../../block/helpers";
import { Symbol } from "../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../block/styled";

/**
 * Component for a Product Node in BlockView.
 * @param data the data for the node.
 * @returns a Product Node of the Flow node type with Mimir styling and functionality.
 */
const BlockProductNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminalBox, showTerminalBox] = useState(false);
  const nodes = useSelector<RootState>((s) => s.projectState.project.nodes) as Node[];
  const edges = useSelector<RootState>((s) => s.projectState.project.edges) as Edge[];
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitNode = useSelector<RootState>((s) => s.splitView.node) as Node;

  // Terminals click
  const onConnectorClick = (conn: Connector) => {
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  return (
    <>
      <NodeBox
        id={"BlockProductNode-" + data.id}
        onMouseOver={() => OnHover(showTerminalBox)}
        onMouseOut={() => OnMouseOut(showTerminalBox)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={FilterTerminals(data, splitView, splitNode)}
          isParent={false}
          isLocation={false}
          splitView={splitView}
          onClick={(conn) => onConnectorClick(conn)}
          menuBox={terminalBox}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
      </NodeBox>

      <HandleComponent
        node={data}
        nodes={nodes}
        terminals={FilterTerminals(data, splitView, splitNode)}
        isParent={false}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockProductNode);
