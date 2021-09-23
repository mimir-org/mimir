import { RootState } from "../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { NodeBox } from "../../../../compLibrary/blockView";
import { HandleComponent, TerminalsComponent } from "../../block/terminals";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { useDispatch, useSelector } from "react-redux";
import { Connector } from "../../../../models";
import { OnHover, OnMouseOut } from "./handlers";
import { IsLocation } from "../../helpers/common";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
} from "../../helpers/block";

/** Component for a Loaction child node in BlockView.
 *  BlockLocationNode returns a node with the styling and functionality of the Location Aspect.
 */
const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);

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
        <p className="node-name">{data.label ?? data.name}</p>
        <TerminalsComponent
          node={data}
          isMenuOpen={terminalMenu}
          list={sortedTerminals}
          width={data.width}
          isParent={false}
          isLocation={IsLocation(data)}
          onClick={onConnectorClick}
          menuButton={terminalButton}
          showTerminalMenu={showTerminalMenu}
          terminalMenu={terminalMenu}
        />
      </NodeBox>
      <HandleComponent
        aspect={data.aspect}
        terminals={sortedTerminals}
        splitView={splitView}
        parent={false}
      />
    </>
  );
};

export default memo(BlockLocationNode);
