import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node, Edge } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { Block } from "..";
import { HandleComponent, TerminalsMenuComponent } from "../../block";
import { IsAspectNode, IsLocation } from "../../helpers/common";
import { Size } from "../../../../compLibrary";
import { GetMenuIcon } from "./helpers";
import { OnHover, OnMouseOut, OnMenuClick } from "./handlers";
import {
  changeActiveConnector,
  removeEdge,
} from "../../../../redux/store/project/actions";
import {
  BlockMessageBox,
  TerminalsMenu,
} from "../../../../compLibrary/blockView";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
  FindAllEdges,
} from "../../helpers/block";

const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [terminalButton, showTerminalButton] = useState(false);

  const dispatch = useDispatch();

  const edges = useSelector<RootState>(
    (state) => state.projectState.project.edges
  ) as Edge[];

  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const nodes = useSelector<RootState>(
    (state) => state.projectState.project.nodes
  ) as Node[];

  const node = nodes.find((x) => x.id === data.id);
  const isSelected = node.isBlockSelected;

  const sortedTerminals = FilterTerminals(
    data.connectors,
    data.aspect,
    isSplitView
  );

  // Enforce size change of node
  useEffect(() => {
    const parentNode = FindNodeByDataId(data.id);
    if (isSplitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, isSplitView]);

  // Force z-index to display edges
  useEffect(() => {
    const allEdges = FindAllEdges();
    allEdges.style.zIndex = "3";
  }, []);

  const onConnectorClick = (conn: Connector) => {
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

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
          isSelected={isSelected}
        />
        <TerminalsMenu
          visible={terminalButton && !IsAspectNode(node)}
          parent={true}
          onClick={() => OnMenuClick(showTerminalMenu, terminalMenu)}
        >
          <img src={GetMenuIcon(node)} alt="options" />
        </TerminalsMenu>

        <TerminalsMenuComponent
          isOpen={terminalMenu}
          isParent={true}
          isLocation={IsLocation(node)}
          list={sortedTerminals}
          width={isSplitView ? Size.SplitView_Width : Size.BlockView_Width}
          onClick={onConnectorClick}
        />
        <HandleComponent
          aspect={data.aspect}
          terminals={sortedTerminals}
          splitView={isSplitView}
        />
      </div>

      {isSplitView && !splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}

      {splitViewNode && (
        <Block
          node={splitViewNode}
          isLocation={true}
          isSplitView={isSplitView}
          isSelected={isSelected}
        />
      )}
    </>
  );
};

export default memo(BlockParentNode);
