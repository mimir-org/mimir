import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TerminalsIcon } from "../../../assets/icons/blockView";
import { NODE_TYPE } from "../../../models/project";
import { NodeBox, TerminalsMenu } from "../../../compLibrary/blockView";
import { HandleComponent, TerminalsComponent } from "../block";
import { setActiveConnector } from "../../../redux/store/project/actions";
import { useDispatch } from "react-redux";
import { Connector } from "../../../models";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);

  const handleTerminalClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const handleOnHover = () => {
    showTerminalButton(true);
  };

  const handleOnMouseOut = () => {
    showTerminalButton(false);
  };

  const onConnectorClick = (conn: Connector) => {
    showTerminalMenu(false);
    dispatch(setActiveConnector(data, conn.id, true, 0));
  };

  useEffect(() => {
    const locationNode = document.querySelector(
      `[data-id="${data.id}"]`
    ) as HTMLElement;

    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data, data.id]);

  return (
    <NodeBox
      id={`BlockLocationNode-` + data.id}
      location
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      length={data.length}
    >
      <TerminalsMenu visible={terminalButton} onClick={handleTerminalClick}>
        <img src={TerminalsIcon} alt="options" />
      </TerminalsMenu>
      <p className="node-name">{data.label ?? data.name}</p>

      <TerminalsComponent
        isOpen={terminalMenu}
        list={data.connectors}
        type={NODE_TYPE.LOCATION}
        width={data.width}
        onClick={onConnectorClick}
      />

      <HandleComponent data={data} />
    </NodeBox>
  );
};

export default memo(BlockLocationNode);
