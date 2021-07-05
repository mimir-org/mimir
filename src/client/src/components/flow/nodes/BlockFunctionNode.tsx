import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Connector, Node } from "../../../models";
import { Size } from "../../../compLibrary";
import { TerminalsIcon, ConnectIcon } from "../../../assets/icons/blockView";
import { changeActiveConnector } from "../../../redux/store/project/actions";
import { TerminalsComponent, ConnectViewComponent } from "../block";
import { HandleComponent } from "../block";
import { CalculateTerminalOrder } from "../helpers/block";
import {
  GetConnectChildren,
  IsMainConnectNode,
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

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView?.mainNodes
  ) as Node[];

  const mainConnectNode = mainConnectNodes.find(
    (node) => node.id === data.id
  ) as Node;

  const connectNodes = mainConnectNode?.connectNodes as Node[];

  const onTerminalMenuClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const onConnectMenuClick = () => {
    showConnectMenu(!connectMenu);
  };

  const onHover = () => {
    showTerminalButton(true);
    showConnectButton(true);
  };

  const onMouseOut = () => {
    showTerminalButton(false);
    showConnectButton(false);
  };

  const onConnectorClick = (conn: Connector) => {
    showTerminalMenu(false);
    showConnectMenu(false);
    const order = CalculateTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, true, order));
  };

  const onConnectViewClick = (node: Node) => {
    if (!isChecked(node)) {
      data.width = Size.ConnectView_Width;
      data.length = Size.ConnectView_Length;
      if (!IsMainConnectNode(data.id)) dispatch(addMainNode(data));
      dispatch(addConnectNode(data, node));
    } else {
      if (connectNodes.length === 1) {
        showConnectMenu(false);
        dispatch(removeMainNode(data));
        data.width = Size.Node_Width;
        data.length = Size.Node_Length;
      }
      dispatch(removeConnectNode(data, node));
    }
  };

  const isChecked = (node: Node) => {
    let result = false;
    connectNodes?.forEach((element) => {
      if (element.id === node.id) result = true;
    });
    return result;
  };

  // Resize main connect node
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
        onMouseOver={onHover}
        onMouseOut={onMouseOut}
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
          list={data.connectors}
          width={data.width}
          aspect={data.aspect}
          onClick={onConnectorClick}
        />

        <ConnectViewComponent
          isOpen={connectMenu}
          list={connectChildren}
          handleClick={onConnectViewClick}
          isChecked={isChecked}
          width={data.width}
        />
      </NodeBox>

      <HandleComponent data={data} />
    </>
  );
};

export default memo(BlockFunctionNode);
