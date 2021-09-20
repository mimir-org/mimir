import { memo, FC, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { Block } from "..";
import { IsLocation } from "../../helpers/common";
import { TerminalsMenuComponent } from "../../block";
import { CalculateTerminalOrder, FilterTerminals } from "../../helpers/block";
import { changeActiveConnector } from "../../../../redux/store/project/actions";
import { BlockMessageBox } from "../../../../compLibrary/blockView";

const BlockLocationParentNode: FC<NodeProps> = ({ data }) => {
  const [terminalMenu, showTerminalMenu] = useState(false);

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

  const onConnectorClick = (conn: Connector) => {
    showTerminalMenu(false);
    const order = CalculateTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, true, order));
  };

  const onClick = () => {
    showTerminalMenu(!terminalMenu);
  };

  return (
    <>
      <Block
        node={node}
        isLocation={IsLocation(node)}
        isSplitView={isSplitView}
        isSelected={isSelected}
        showTerminalMenu={true}
        onClick={() => onClick()}
      />

      <TerminalsMenuComponent
        isOpen={terminalMenu}
        isParent={true}
        list={sortedTerminals}
        width={952}
        onClick={() => null}
      />

      {isSplitView && !splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}

      {splitViewNode && (
        <Block
          node={splitViewNode}
          isLocation={true}
          isSplitView={true}
          isSelected={isSelected}
          showTerminalMenu={terminalMenu}
          onClick={() => onClick()}
        />
      )}
    </>
  );
};

export default memo(BlockLocationParentNode);
