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

  const notValid =
    splitViewNode?.type === NODE_TYPE.LOCATION &&
    (data?.type === NODE_TYPE.LOCATION ||
      data?.type === NODE_TYPE.ASPECT_LOCATION);

  return !splitView ? (
    <Block data={data} location={false} splitView={splitView} />
  ) : (
    <>
      <Block data={data} location={false} splitView={splitView} />
      {!splitViewNode ? (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      ) : notValid ? (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Location_Message}</p>
        </BlockMessageBox>
      ) : (
        <Block
          data={splitViewNode}
          location={splitViewNode}
          splitView={splitView}
        />
      )}
    </>
  );
};

export default memo(FunctionBlock);
