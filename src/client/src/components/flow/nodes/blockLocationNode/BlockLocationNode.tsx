import { RootState } from "../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { NodeBox } from "../../styled";
import { BlockNodeNameBox } from "../../block/styled";
import { HandleComponent, TerminalsComponent } from "../../block/terminals";
import { useDispatch, useSelector } from "react-redux";
import { Node } from "../../../../models";
import { OnHover, OnMouseOut, OnConnectorClick } from "./handlers";
import { FilterTerminals, GetNodeByDataId } from "../../block/helpers";
import { Symbol } from "../../../../compLibrary/symbol";

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

  // Enforce size change of node
  useEffect(() => {
    const locationNode = GetNodeByDataId(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  return (
    <>
      <NodeBox
        id={"BlockLocationNode-" + data.id}
        width={data.width}
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
          isParent={false}
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
        terminals={FilterTerminals(data, splitView, splitNode)}
        isParent={false}
        splitView={splitView}
        electro={electro}
      />
    </>
  );
};

export default memo(BlockLocationNode);
