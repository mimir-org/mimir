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
import { GetConnectChildren } from "../helpers/block/connectView";
import { FilterConnectors } from "../helpers/block";
import { FindNodeById, SetConnectNodeSize } from "../helpers/block/connectView";
import {
  addConnectNode,
  addMainConnectNode,
  removeConnectNode,
} from "../../../redux/store/connectView/actions";
import {
  NodeBox,
  TerminalsMenu,
  ConnectMenu,
} from "../../../compLibrary/blockView";

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

  const mainConnectNode = useSelector<RootState>(
    (state) => state.connectView.mainNode
  ) as Node;

  const connectNodes = useSelector<RootState>(
    (state) => state.connectView.connectNodes
  ) as Node[];

  const isConnectViewNode = data.id === mainConnectNode?.id;

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
      node.width = Size.ConnectView_Width;
      node.length = Size.ConnectView_Length;
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
    SetConnectNodeSize(mainConnectNode, connectNodes);
  }, [mainConnectNode, data, connectNodes]);

  useEffect(() => {
    const twinNode = FindNodeById(mainConnectNode?.id);
    // TODO: Check this render
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
  }, [mainConnectNode]);

  return (
    <>
      <NodeBox
        id={`BlockFunctionNode-` + data.id}
        onMouseOver={handleOnHover}
        onMouseOut={handleOnMouseOut}
        width={data.width}
        length={data.length}
        isSelectedConnection={isConnectViewNode}
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

        <HandleComponent data={data} />
      </NodeBox>
    </>
  );
};

export default memo(BlockFunctionNode);