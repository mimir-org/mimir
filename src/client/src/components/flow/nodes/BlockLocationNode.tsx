import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TerminalsIcon } from "../../../assets/icons/blockView";
import { NodeBox, TerminalsMenu } from "../../../compLibrary/blockView";
import { HandleComponent, TerminalsComponent } from "../block";
import { changeActiveConnector } from "../../../redux/store/project/actions";
import { useDispatch } from "react-redux";
import { Aspect, Connector } from "../../../models";
import { CalculateTerminalOrder } from "../helpers/block";
import { FindNodeById } from "../helpers/block/connectView";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);

  const onTerminalClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const onHover = () => {
    showTerminalButton(true);
  };

  const onMouseOut = () => {
    showTerminalButton(false);
  };

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
        onMouseOver={onHover}
        onMouseOut={onMouseOut}
        width={data.width}
        length={data.length}
        location
      >
        <TerminalsMenu visible={terminalButton} onClick={onTerminalClick}>
          <img src={TerminalsIcon} alt="options" />
        </TerminalsMenu>
        <p className="node-name">{data.label ?? data.name}</p>

        <TerminalsComponent
          isOpen={terminalMenu}
          list={data.connectors}
          type={Aspect.Location}
          width={data.width}
          onClick={onConnectorClick}
        />
      </NodeBox>
      <HandleComponent data={data} />
    </>
  );
};

export default memo(BlockLocationNode);
