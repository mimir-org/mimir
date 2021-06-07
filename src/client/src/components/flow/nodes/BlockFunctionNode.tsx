import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { RootState } from "../../../redux/store";
import { Node } from "../../../models/project";
import { IsLocationNode, GetChildren } from "../helpers/common";
import { Size } from "../../../componentLibrary";
import { TerminalsIcon, ConnectIcon } from "../../../assets/icons/blockView";
import {
  TerminalsComponent,
  ConnectViewComponent,
  HandleComponent,
} from "../block";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  addConnectNode,
  addMainConnectNode,
  removeConnectNode,
} from "../../../redux/store/connectView/actions";
import {
  NodeBox,
  TerminalsMenu,
  ConnectMenu,
} from "../../../componentLibrary/blockView";

const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [connectButton, showConnectButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [connectMenu, showConnectMenu] = useState(false);
  const connectors = GetConnectors();
  const children = GetChildren(data);
  const hasChildren = children?.length > 0;

  const mainConnectNode = useSelector<RootState>(
    (state) => state.connectView.mainNode
  ) as Node;

  const connectViewList = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

  const isLocationNode = useSelector<RootState>((state) =>
    IsLocationNode(state.splitView.node)
  ) as boolean;

  const isConnectViewNode = data.id === mainConnectNode?.id;

  const onTerminalClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const onConnClick = () => {
    showConnectMenu(!connectMenu);
  };

  const handleOnHover = () => {
    showTerminalButton(true);
    showConnectButton(true);
  };

  const handleOnMouseOut = () => {
    showTerminalButton(false);
    showConnectButton(false);
  };

  const onConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    showTerminalMenu(false);
    showConnectMenu(false);
    SetConnectors(connectors);
  };

  const onChange = (node: Node) => {
    if (!isChecked(node)) {
      data.width = Size.ConnectionView_Width;
      data.length = Size.ConnectionView_Length;
      dispatch(addMainConnectNode(data));
      dispatch(addConnectNode(node));
    } else dispatch(removeConnectNode(node));
  };

  const isChecked = (node: Node): boolean => {
    let result = false;
    connectViewList?.forEach((element) => {
      if (element.id === node.id) result = true;
    });
    return result;
  };

  useEffect(() => {
    if (mainConnectNode) {
      const functionNode = document.querySelector(
        `[data-id="${mainConnectNode.id}"]`
      ) as HTMLElement;

      if (functionNode) {
        functionNode.style.width = `${Size.ConnectionView_Width}px`;
        functionNode.style.height = `${Size.ConnectionView_Length}px`;
        functionNode.style.zIndex = "1";
      }
    }
  }, [mainConnectNode, data]);

  return (
    <NodeBox
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      length={data.length}
      isSelectedConnection={isConnectViewNode}
    >
      <TerminalsMenu visible={terminalButton} onClick={onTerminalClick}>
        <img src={TerminalsIcon} alt="options" />
      </TerminalsMenu>
      <ConnectMenu visible={connectButton && hasChildren} onClick={onConnClick}>
        <img src={ConnectIcon} alt="options" />
      </ConnectMenu>

      <p className="node-name">{data.label ?? data.name}</p>

      <TerminalsComponent
        isOpen={terminalMenu}
        list={data.connectors}
        width={data.width}
        onClick={onConnectorClick}
      ></TerminalsComponent>

      <ConnectViewComponent
        isOpen={connectMenu}
        list={children}
        handleClick={onChange}
        isChecked={isChecked}
        width={data.width}
      ></ConnectViewComponent>

      <HandleComponent
        data={data}
        list={connectors}
        isLocation={isLocationNode}
        type="block"
      ></HandleComponent>

      <HandleComponent
        data={data}
        list={data.connectors}
        isLocation={isLocationNode}
      ></HandleComponent>
    </NodeBox>
  );
};

export default memo(BlockFunctionNode);
