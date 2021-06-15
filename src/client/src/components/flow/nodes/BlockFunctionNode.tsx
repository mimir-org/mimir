import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Position } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Connector, Node } from "../../../models/project";
import { Handle } from "react-flow-renderer";
import { HandleBox } from "../../../componentLibrary/blockView";
import { Size } from "../../../componentLibrary";
import { TerminalsIcon, ConnectIcon } from "../../../assets/icons/blockView";
import { setActiveConnector } from "../../../redux/store/project/actions";
import { TerminalsComponent, ConnectViewComponent } from "../block";
import {
  GetConnectChildren,
  GetConnectorIcon,
  GetHandlePosition,
  SortConnectors,
} from "../helpers/common";
import {
  CalculateTerminalOrder,
  GetBlockHandleType,
  StackTerminals,
} from "../helpers/block";
import {
  FindNodeById,
  SetConnectNodeDefaultSize,
} from "../helpers/block/connectionView";
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

  const onConnectorClick = (conn: Connector) => {
    showTerminalMenu(false);
    showConnectMenu(false);
    const order = CalculateTerminalOrder(data, 0, conn.type);
    dispatch(setActiveConnector(data, conn.id, true, order));
  };

  const onChange = (node: Node) => {
    if (!isChecked(node)) {
      node.width = Size.ConnectView_Width;
      node.length = Size.ConnectView_Length;
      dispatch(addMainConnectNode(node));
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
        <TerminalsMenu visible={terminalButton} onClick={onTerminalClick}>
          <img src={TerminalsIcon} alt="options" />
        </TerminalsMenu>
        <ConnectMenu
          visible={connectButton && hasChildren}
          onClick={onConnClick}
        >
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
        <>
          {data.connectors?.map((conn) => {
            const [type, pos] = GetBlockHandleType(conn);
            if (pos === Position.Right) {
              return (
                <HandleBox
                  id={"handle-" + conn.id}
                  position={GetHandlePosition(pos)}
                  key={conn.id}
                  order={StackTerminals(conn.order)}
                  visible={true}
                  icon={GetConnectorIcon(conn.terminal)}
                >
                  <Handle
                    style={{ top: "-50px" }}
                    type={type}
                    position={pos}
                    id={conn.id}
                    key={conn.id}
                    className="react-flow__handle-right"
                  />
                </HandleBox>
              );
            }
            return null;
          })}
        </>
      </NodeBox>
    </>
  );
};

export default memo(BlockFunctionNode);
