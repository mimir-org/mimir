import { RootState } from "../../../../redux/store";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TerminalsIcon } from "../../../../assets/icons/blockView";
import { NodeBox, TerminalsMenu } from "../../../../compLibrary/blockView";
import { HandleComponent, TerminalsMenuComponent } from "../../block";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { useDispatch, useSelector } from "react-redux";
import { Connector } from "../../../../models";
import { CalculateTerminalOrder, FilterTerminals } from "../../helpers/block";
import { FindNodeById } from "../../helpers/block/connectView";
import { OnHover, OnMouseOut, OnTerminalClick } from "./handlers";

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
    showTerminalMenu(false);
    const order = CalculateTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, true, order));
  };

  // Enforce size change of node
  useEffect(() => {
    const locationNode = FindNodeById(data.id);
    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data]);

  return (
    <>
      <NodeBox
        id={`BlockLocationNode-` + data.id}
        onMouseOver={() => OnHover(showTerminalButton)}
        onMouseOut={() => OnMouseOut(showTerminalButton)}
        width={data.width}
        length={data.length}
        location
      >
        <TerminalsMenu
          visible={terminalButton}
          onClick={() => OnTerminalClick(showTerminalMenu, terminalMenu)}
        >
          <img src={TerminalsIcon} alt="options" />
        </TerminalsMenu>
        <p className="node-name">{data.label ?? data.name}</p>

        <TerminalsMenuComponent
          isOpen={terminalMenu}
          list={sortedTerminals}
          width={data.width}
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
