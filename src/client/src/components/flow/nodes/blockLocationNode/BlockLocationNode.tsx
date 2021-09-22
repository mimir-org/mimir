import { RootState } from "../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TerminalsMenuLocationIcon } from "../../../../assets/icons/blockView";
import { NodeBox, TerminalsMenu } from "../../../../compLibrary/blockView";
import { HandleComponent, TerminalsMenuComponent } from "../../block";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { useDispatch, useSelector } from "react-redux";
import { Connector } from "../../../../models";
import { OnHover, OnMouseOut, OnTerminalClick } from "./handlers";
import { IsLocation } from "../../helpers/common";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
} from "../../helpers/block";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const sortedTerminals = FilterTerminals(
    data.connectors,
    data.aspect,
    splitView
  );

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
        <TerminalsMenu
          visible={terminalButton}
          parent={false}
          onClick={() => OnTerminalClick(showTerminalMenu, terminalMenu)}
        >
          <img src={TerminalsMenuLocationIcon} alt="options" />
        </TerminalsMenu>
        <p className="node-name">{data.label ?? data.name}</p>

        <TerminalsMenuComponent
          isOpen={terminalMenu}
          list={sortedTerminals}
          width={data.width}
          isParent={false}
          isLocation={IsLocation(data)}
          onClick={onConnectorClick}
        />
      </NodeBox>
      <HandleComponent
        aspect={data.aspect}
        terminals={sortedTerminals}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockLocationNode);
