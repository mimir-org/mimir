import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { TextResources } from "../../../assets/textResources";
import { Node } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { Block } from ".";
import { BlockMessageBox } from "../../../componentLibrary/blockView";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  return !splitView ? (
    <Block data={data} location={false} splitView={splitView} />
  ) : (
    <>
      <Block data={data} location={false} splitView={splitView} />
      {!splitViewNode ? (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Aspect}</p>
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
