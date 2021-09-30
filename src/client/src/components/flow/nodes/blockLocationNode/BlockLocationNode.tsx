import { RootState } from "../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { NodeBox } from "../../styled";
import { BlockNodeNameBox } from "../../block/styled";
import { HandleComponent, TerminalsComponent } from "../../block/terminals";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { useDispatch, useSelector } from "react-redux";
import { Connector, Node } from "../../../../models";
import { OnHover, OnMouseOut } from "./handlers";
import { IsLocation } from "../../helpers/common";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
} from "../../helpers/block";

/**
 * Component for a Location Node in BlockView.
 * @param data the data for the node.
 * @returns a Location Node of the Flow node type with Mimir styling and functionality.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [inputTerminalMenu, showInputTerminalMenu] = useState(false);
  const [outputTerminalMenu, showOutputTerminalMenu] = useState(false);

  const nodes = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  ) as Node[];

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const sortedTerminals = FilterTerminals(data, splitView);

  const onConnectorClick = (conn: Connector) => {
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));
  };

  // Enforce size change of node
  useEffect(() => {
    const locationNode = FindNodeByDataId(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  return (
    <>
      <NodeBox
        id={`BlockLocationNode-` + data.id}
        onMouseOver={() => OnHover(showTerminalButton, data.id)}
        onMouseOut={() => OnMouseOut(showTerminalButton, data.id)}
        width={data.width}
        length={data.length}
        location
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>

        <TerminalsComponent
          node={data}
          isInputMenuOpen={inputTerminalMenu}
          isOutputMenuOpen={outputTerminalMenu}
          terminals={sortedTerminals}
          width={data.width}
          isParent={false}
          isLocation={IsLocation(data)}
          isSplitView={splitView}
          onClick={(conn) => onConnectorClick(conn)}
          menuButton={terminalButton}
          showInputTerminalMenu={showInputTerminalMenu}
          showOutputTerminalMenu={showOutputTerminalMenu}
        />
      </NodeBox>

      <HandleComponent
        node={data}
        nodes={nodes}
        terminals={sortedTerminals}
        isParent={false}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockLocationNode);
