import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { TextResources } from "../../../assets/textResources";
import { Node, NODE_TYPE } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { Block } from ".";
import { BlockMessageBox } from "../../../componentLibrary/blockView";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isLocationNode = splitViewNode?.type === NODE_TYPE.LOCATION;

  return !splitView ? (
    <Block data={data} splitView={null} location={false} />
  ) : (
    <>
      <Block data={data} splitView={null} location={false} />
      {!splitViewNode ? (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Aspect}</p>
        </BlockMessageBox>
      ) : isLocationNode ? (
        <Block data={data} splitView={splitViewNode} location={true} />
      ) : (
        <Block data={data} splitView={splitViewNode} location={false} />
      )}
    </>
  );
};

export default memo(FunctionBlock);
