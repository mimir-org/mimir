import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node, Edge } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { Block } from "..";
import { HandleComponent, TerminalsComponent } from "../../block";
import { IsLocation } from "../../helpers/common";
import { Size } from "../../../../compLibrary";
import { OnHover, OnMouseOut } from "./handlers";
import { BlockMessageBox } from "../../../../compLibrary/blockView";
import {
  changeActiveConnector,
  removeEdge,
} from "../../../../redux/store/project/actions";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
  FindAllEdges,
} from "../../helpers/block";

/** Component for parent node in BlockView.
 *  This is the big block that displays the selected node in the Explorer
 */

const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [terminalButton, showTerminalButton] = useState(false);
  const [terminalLocationMenu, showTerminalLocationMenu] = useState(false);
  const [terminalLocationButton, showTerminalLocationButton] = useState(false);
  const dispatch = useDispatch();

  const nodes = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  ) as Node[];

  const edges = useSelector<RootState>(
    (state) => state.projectState.project.edges
  ) as Edge[];

  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const actualSplitNode = nodes.find((x) => x.id === splitViewNode?.id);
  const node = nodes.find((x) => x.id === data.id);

  // Enforce size change of node
  useEffect(() => {
    const parentNode = FindNodeByDataId(data.id);
    if (isSplitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, isSplitView]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    const allEdges = FindAllEdges();
    allEdges.style.zIndex = "3";
  }, []);

  const onConnectorClick = (conn: Connector) => {
    const actualNode = nodes.find((x) => x.id === conn.nodeId);
    const order = SetTerminalOrder(actualNode, 0, conn.relationType);
    dispatch(changeActiveConnector(actualNode, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find(
        (e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id
      );
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  return (
    <>
      <div
        onMouseOver={() => OnHover(showTerminalButton)}
        onMouseOut={() => OnMouseOut(showTerminalButton)}
      >
        <Block
          node={node}
          isLocation={IsLocation(node)}
          isSplitView={isSplitView}
          isSelected={node.isBlockSelected}
        />
        <TerminalsComponent
          node={node}
          isMenuOpen={terminalMenu}
          isParent={true}
          isLocation={IsLocation(node)}
          list={FilterTerminals(node, isSplitView)}
          width={Size.BlockView_Width}
          onClick={onConnectorClick}
          menuButton={terminalButton}
          showTerminalMenu={showTerminalMenu}
          terminalMenu={terminalMenu}
        />
        <HandleComponent
          aspect={node.aspect}
          terminals={FilterTerminals(node, isSplitView)}
          splitView={isSplitView}
        />
      </div>

      {isSplitView && !splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}

      {splitViewNode && (
        <div
          onMouseOver={() => OnHover(showTerminalLocationButton)}
          onMouseOut={() => OnMouseOut(showTerminalLocationButton)}
        >
          <Block
            node={actualSplitNode}
            isLocation={true}
            isSplitView={true}
            isSelected={actualSplitNode.isBlockSelected}
          />
          <TerminalsComponent
            node={actualSplitNode}
            isMenuOpen={terminalLocationMenu}
            isParent={true}
            isLocation={true}
            list={FilterTerminals(actualSplitNode, isSplitView)}
            width={Size.BlockView_Width + Size.BlockView_MarginLeft}
            onClick={onConnectorClick}
            menuButton={terminalLocationButton}
            showTerminalMenu={showTerminalLocationMenu}
            terminalMenu={terminalLocationMenu}
            isSplitView={true}
          />
          <HandleComponent
            aspect={actualSplitNode.aspect}
            terminals={FilterTerminals(actualSplitNode, isSplitView)}
            splitView={true}
          />
        </div>
      )}
    </>
  );
};

export default memo(BlockParentNode);
