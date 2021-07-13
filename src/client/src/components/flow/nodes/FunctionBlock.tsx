import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { TextResources } from "../../../assets/text";
import { Aspect, Node } from "../../../models";
import { RootState } from "../../../redux/store";
import { Block } from ".";
import { BlockMessageBox } from "../../../compLibrary/blockView";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const isSplitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isLocation = data.aspect === Aspect.Location;

  return !isSplitView ? (
    <Block data={data} location={isLocation} splitView={isSplitView} />
  ) : (
    <>
      <Block data={data} location={isLocation} splitView={isSplitView} />
      {!splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}
      {splitViewNode && (
        <Block
          data={splitViewNode}
          location={splitViewNode}
          splitView={isSplitView}
        />
      )}
    </>
  );
};

export default memo(FunctionBlock);
