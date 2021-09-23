import * as Handlers from "./handlers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Connector, Node, Edge } from "../../../../models";
import { Size } from "../../../../compLibrary";
import { IsLocation } from "../../helpers/common";
import { NodeBox, ConnectMenu } from "../../../../compLibrary/blockView";
import { ConnectMenuIcon } from "../../../../assets/icons/blockView";
import {
  changeActiveConnector,
  removeEdge,
} from "../../../../redux/store/project/actions";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindAllEdges,
} from "../../helpers/block";
import {
  TerminalsComponent,
  ConnectViewComponent,
  HandleComponent,
} from "../../block";
import {
  GetConnectChildren,
  IsMainConnectNode,
  SetMainConnectNodeSize,
  SetMainConnectNodeColor,
} from "../../helpers/block/connectView";
import {
  addConnectNode,
  addMainNode,
  removeConnectNode,
  removeMainNode,
} from "../../../../redux/store/connectView/actions";

const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [terminalButton, showTerminalButton] = useState(false);
  const [connectButton, showConnectButton] = useState(false);
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [connectMenu, showConnectMenu] = useState(false);

  const nodes = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  ) as Node[];

  const edges = useSelector<RootState>(
    (state) => state.projectState.project.edges
  ) as Edge[];

  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView?.mainNodes
  ) as Node[];

  const connectChildren = GetConnectChildren(data, nodes, edges);
  const hasChildren = connectChildren?.length > 0;
  const sortedTerminals = FilterTerminals(data, splitView);

  const mainConnectNode = mainConnectNodes.find((x) => x.id === data.id);
  const connectNodes = mainConnectNode?.connectNodes;
  if (!mainConnectNode) data.width = Size.Node_Width;

  const onConnectorClick = (conn: Connector) => {
    showConnectMenu(false);
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find(
        (e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id
      );
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  const onConnectViewClick = (node: Node) => {
    if (!isConnectorChecked(node)) {
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

  const isConnectorChecked = (node: Node) => {
    let result = false;
    connectNodes?.forEach((element) => {
      if (element.id === node.id) result = true;
    });
    return result;
  };

  // Resize main connect node
  useEffect(() => {
    SetMainConnectNodeSize(mainConnectNode?.id, data.id, connectNodes);
    SetMainConnectNodeColor(mainConnectNode?.id, data.id, connectNodes);
  }, [mainConnectNode, data, connectNodes]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    if (mainConnectNode) {
      const edges = FindAllEdges();
      edges.style.zIndex = "3";
    }
  }, [mainConnectNode]);

  return (
    <>
      <NodeBox
        id={"BlockFunctionNode-" + data.id}
        onMouseOver={() =>
          Handlers.OnHover(showTerminalButton, showConnectButton, data.id)
        }
        onMouseOut={() =>
          Handlers.OnMouseOut(showTerminalButton, showConnectButton, data.id)
        }
        width={data.width}
        length={data.length}
      >
        <ConnectMenu
          visible={connectButton && hasChildren}
          onClick={() =>
            Handlers.OnConnectMenuClick(showConnectMenu, connectMenu)
          }
        >
          <img src={ConnectMenuIcon} alt="options" />
        </ConnectMenu>

        <p className="node-name">{data.label ?? data.name}</p>

        <TerminalsComponent
          node={data}
          isOpen={terminalMenu}
          list={sortedTerminals}
          width={data.width}
          isParent={false}
          isLocation={IsLocation(data)}
          onClick={onConnectorClick}
          menuButton={terminalButton}
          showTerminalMenu={showTerminalMenu}
          terminalMenu={terminalMenu}
        />

        <ConnectViewComponent
          isOpen={connectMenu}
          list={connectChildren}
          handleClick={onConnectViewClick}
          isChecked={isConnectorChecked}
          width={data.width}
        />
      </NodeBox>

      <HandleComponent
        aspect={data.aspect}
        terminals={sortedTerminals}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockFunctionNode);
