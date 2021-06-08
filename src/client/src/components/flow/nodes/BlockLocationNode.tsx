import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TerminalsIcon } from "../../../assets/icons/blockView";
import { Connector, NODE_TYPE } from "../../../models/project";
import { NodeBox, TerminalsMenu } from "../../../componentLibrary/blockView";
import { HandleComponent, TerminalsComponent } from "../block";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [drawConnectors, setDrawConnectors] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState(null);

  const handleClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const handleOnHover = () => {
    showTerminalButton(true);
  };

  const handleOnMouseOut = () => {
    showTerminalButton(false);
  };

  const handleConnectorClick = (connector: Connector) => {
    setSelectedConnector(connector);
    setDrawConnectors(true);
    showTerminalMenu(false);
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
      location
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      length={data.length}
    >
      <TerminalsMenu visible={terminalButton} onClick={handleClick}>
        <img src={TerminalsIcon} alt="options" />
      </TerminalsMenu>
      <p className="node-name">{data.label ?? data.name}</p>

      <TerminalsComponent
        isOpen={terminalMenu}
        list={data.connectors}
        type={NODE_TYPE.LOCATION}
        width={data.width}
        onClick={handleConnectorClick}
      ></TerminalsComponent>

      <HandleComponent
        drawConns={drawConnectors}
        data={data}
        list={data.connectors}
        selectedConn={selectedConnector}
        type={"block"}
      ></HandleComponent>

      <HandleComponent
        drawConns={drawConnectors}
        data={data}
        list={data.connectors}
        selectedConn={selectedConnector}
      ></HandleComponent>
    </NodeBox>
  );
};

export default memo(BlockLocationNode);
