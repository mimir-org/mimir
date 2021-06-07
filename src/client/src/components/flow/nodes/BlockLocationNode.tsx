import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TerminalsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import red, { RootState } from "../../../redux/store";
import { Node, NODE_TYPE } from "../../../models/project";
import { IsLocationNode } from "../helpers/common";
import { NodeBox, TerminalsMenu } from "../../../componentLibrary/blockView";
import { HandleComponent, TerminalsComponent } from "../block";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);
  const connectors = GetConnectors();
  const splitView = red.store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;
  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isBlockSelected)
  ) as Node;

  const isLocation = isSplitView
    ? IsLocationNode(splitViewNode)
    : IsLocationNode(selectedNode);

  const handleClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const handleOnHover = () => {
    showTerminalButton(true);
  };

  const handleOnMouseOut = () => {
    showTerminalButton(false);
  };

  const handleConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    showTerminalMenu(false);
    SetConnectors(connectors);
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
        type="location"
        width={data.width}
        onClick={handleConnectorClick}
      ></TerminalsComponent>

      <HandleComponent
        data={data}
        list={connectors}
        isLocation={isLocation}
        type={NODE_TYPE.LOCATION}
      ></HandleComponent>

      <HandleComponent
        data={data}
        list={data.connectors}
        isLocation={isLocation}
      ></HandleComponent>
    </NodeBox>
  );
};

export default memo(BlockLocationNode);
