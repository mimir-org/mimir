import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { Size } from "../../../compLibrary";
import { TerminalsIcon, ConnectIcon } from "../../../assets/icons/blockView";
import { setActiveConnector } from "../../../redux/store/project/actions";
import { TerminalsComponent, ConnectViewComponent } from "../block";
import { HandleComponent } from "../block";
import { FilterConnectors } from "../helpers/block";
import {
  GetConnectChildren,
  SetMainConnectNodeSize,
} from "../helpers/block/connectView";
import {
  NodeBox,
  TerminalsMenu,
  ConnectMenu,
} from "../../../compLibrary/blockView";
import {
  addConnectNode,
  addMainNode,
  removeConnectNode,
  removeMainNode,
} from "../../../redux/store/connectView/actions";

const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [connectButton, showConnectButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [connectMenu, showConnectMenu] = useState(false);
  const connectChildren = GetConnectChildren(data);
  const hasChildren = connectChildren?.length > 0;
  const sortedConns = FilterConnectors(
    data.connectors,
    data.type
  ) as Connector[];

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView?.mainNodes
  ) as Node[];

  const mainConnectNode = mainConnectNodes?.find(
    (node) => node?.id === data.id
  ) as Node;

  const isConnectView = mainConnectNodes.length !== 0;

  const connectNodes = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

  const onTerminalMenuClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const onConnectMenuClick = () => {
    showConnectMenu(!connectMenu);
  };

  const handleOnHover = () => {
    if (sortedConns.length > 0) showTerminalButton(true);
    showConnectButton(true);
  };

  const handleOnMouseOut = () => {
    showTerminalButton(false);
    showConnectButton(false);
  };

  const onConnectorClick = (conn: Connector) => {
    showTerminalMenu(false);
    showConnectMenu(false);
    dispatch(setActiveConnector(data, conn.id, true, 0));
  };

  const onConnectViewClick = (node: Node) => {
    if (!isChecked(node)) {
      data.width = Size.ConnectView_Width;
      data.length = Size.ConnectView_Length;
      dispatch(addMainNode(data));
      dispatch(addConnectNode(node));
    } else {
      if (connectNodes.length === 1) {
        showConnectMenu(false);
        dispatch(removeMainNode(data));
      }
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
    SetMainConnectNodeSize(mainConnectNode?.id, data.id, connectNodes);
  }, [mainConnectNode, data, connectNodes]);

  // Force edges' z-index in ConnectView
  useEffect(() => {
    if (mainConnectNode) {
      const allEdges = document.querySelector(
        ".react-flow__edges"
      ) as HTMLElement;
      allEdges.style.zIndex = "3";
    }
  }, [mainConnectNode]);

  return (
    <>
      <NodeBox
        id={`BlockFunctionNode-` + data.id}
        onMouseOver={handleOnHover}
        onMouseOut={handleOnMouseOut}
        width={data.width}
        length={data.length}
      >
        <TerminalsMenu visible={terminalButton} onClick={onTerminalMenuClick}>
          <img src={TerminalsIcon} alt="options" />
        </TerminalsMenu>
        <ConnectMenu
          visible={connectButton && hasChildren}
          onClick={onConnectMenuClick}
        >
          <img src={ConnectIcon} alt="options" />
        </ConnectMenu>

        <p className="node-name">{data.label ?? data.name}</p>

        <TerminalsComponent
          isOpen={terminalMenu}
          list={sortedConns}
          width={data.width}
          onClick={onConnectorClick}
        />

        <ConnectViewComponent
          isOpen={connectMenu}
          list={connectChildren}
          handleClick={onConnectViewClick}
          isChecked={isChecked}
          width={data.width}
        />

        <HandleComponent data={data} isConnectView={isConnectView} />
      </NodeBox>
    </>
  );
};

export default memo(BlockFunctionNode);
