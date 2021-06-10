import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Connector, Edge, Node } from "../../../models/project";
import { GetConnectChildren, SortConnectors } from "../helpers/common";
import { Size } from "../../../componentLibrary";
import { TerminalsIcon, ConnectIcon } from "../../../assets/icons/blockView";
import {
  FindNodeById,
  SetConnectNodeDefaultSize,
} from "../helpers/block/connectionView";
import {
  TerminalsComponent,
  ConnectViewComponent,
  HandleComponent,
} from "../block";
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
  const connectChildren = GetConnectChildren(data);
  const hasChildren = connectChildren?.length > 0;
  const [drawConnectors, setDrawConnectors] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState(null);
  const sortedConns = SortConnectors(data.connectors) as Connector[];

  const mainConnectNode = useSelector<RootState>(
    (state) => state.connectView.mainNode
  ) as Node;

  const connectNodes = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

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

  const onConnectorClick = (connector: Connector) => {
    setSelectedConnector(connector);
    setDrawConnectors(true);
    showTerminalMenu(false);
    showConnectMenu(false);
  };

  const onChange = (node: Node) => {
    if (!isChecked(node)) {
      data.width = Size.ConnectView_Width;
      data.length = Size.ConnectView_Length;
      dispatch(addMainConnectNode(data));
      dispatch(addConnectNode(node));
    } else {
      connectNodes.length === 1 && showConnectMenu(false);
      dispatch(removeConnectNode(node));
    }
  };

  const isChecked = (node: Node): boolean => {
    let result = false;
    connectNodes?.forEach((element) => {
      if (element.id === node.id) result = true;
    });
    return result;
  };

  useEffect(() => {
    if (connectNodes.length < 1) dispatch(addMainConnectNode(null));
  }, [connectNodes.length, dispatch]);

  useEffect(() => {
    SetConnectNodeDefaultSize(mainConnectNode, connectNodes);
  }, [mainConnectNode, data, connectNodes]);

  useEffect(() => {
    const twinNode = FindNodeById(mainConnectNode?.id);
    const clicked = () => {
      if (twinNode) twinNode.style.zIndex = "1";
    };
    if (mainConnectNode) {
      window.addEventListener("click", clicked);
    } else window.removeEventListener("click", clicked);
  });

  useEffect(() => {
    if (mainConnectNode) {
      const allEdges = document.querySelector(
        ".react-flow__edges"
      ) as HTMLElement;
      allEdges.style.zIndex = "3";
    }
  }, []);

  return (
    <NodeBox
      id={`BlockFunctionNode-` + data.id}
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
        list={sortedConns}
        width={data.width}
        onClick={onConnectorClick}
      ></TerminalsComponent>

      <ConnectViewComponent
        isOpen={connectMenu}
        list={connectChildren}
        handleClick={onChange}
        isChecked={isChecked}
        width={data.width}
      ></ConnectViewComponent>

      <HandleComponent
        drawConns={drawConnectors}
        data={data}
        list={data.connectors}
        selectedConn={selectedConnector}
        type="block"
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

export default memo(BlockFunctionNode);
