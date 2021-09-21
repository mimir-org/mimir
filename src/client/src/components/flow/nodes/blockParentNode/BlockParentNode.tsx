import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { Block } from "..";
import { HandleComponent, TerminalsMenuComponent } from "../../block";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { IsAspectNode, IsLocation } from "../../helpers/common";
import { Size } from "../../../../compLibrary";
import {
  TerminalsMenuLocationIcon,
  TerminalsMenuIcon,
} from "../../../../assets/icons/blockView";

import {
  BlockMessageBox,
  TerminalsMenu,
} from "../../../../compLibrary/blockView";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeById,
  FindAllEdges,
} from "../../helpers/block";

const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const [terminalMenu, showTerminalMenu] = useState(false);
  const [terminalButton, showTerminalButton] = useState(false);

  const dispatch = useDispatch();

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
    const parentNode = FindNodeById(data.id);
    if (isSplitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, isSplitView]);

  // Force z-index to show edges
  useEffect(() => {
    const edges = FindAllEdges();
    edges.style.zIndex = "3";
  }, []);

  const onConnectorClick = (conn: Connector) => {
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));
  };

  const onClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  const onHover = () => {
    showTerminalButton(true);
  };

  const onMouseOut = () => {
    showTerminalButton(false);
  };

  return (
    <>
      <div onMouseOver={onHover} onMouseOut={onMouseOut}>
        <Block
          node={node}
          isLocation={IsLocation(node)}
          isSplitView={isSplitView}
          isSelected={isSelected}
        />
        <TerminalsMenu
          visible={terminalButton && !IsAspectNode(node)}
          parent={true}
          onClick={onClick}
        >
          <img
            src={
              IsLocation(node) ? TerminalsMenuLocationIcon : TerminalsMenuIcon
            }
            alt="options"
          />
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
