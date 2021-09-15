import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { TextResources } from "../../../assets/text";
import { Node } from "../../../models";
import { RootState } from "../../../redux/store";
import { Block } from ".";
import { BlockMessageBox } from "../../../compLibrary/blockView";
import { IsLocation } from "../helpers/common";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
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

  return (
    <>
      <Block
        data={data}
        isLocation={IsLocation(data)}
        isSplitView={false}
        isSelected={isSelected}
      />
      )
      {isSplitView && !splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}
      {splitViewNode && (
        <Block
          data={splitViewNode}
          isLocation={true}
          isSplitView={true}
          isSelected={isSelected}
        />
      )}
    </>
  );
};

export default memo(FunctionBlock);
