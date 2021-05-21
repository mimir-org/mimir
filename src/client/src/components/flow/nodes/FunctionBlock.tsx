import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { ArrowIcon } from "../../../assets/icons/blockView";
import { TextResources } from "../../../assets/textResources";
import { Node, NODE_TYPE } from "../../../models/project";
import { RootState } from "../../../redux/store";
import {
  FunctionBox,
  BlockMessageBox,
} from "../../../componentLibrary/blockView";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const isLocation = splitViewNode?.type === NODE_TYPE.LOCATION;

  return splitView ? (
    <>
      <FunctionBox id={"function-block-" + data.id}>
        <img src={ArrowIcon} alt="arrow" className="icon"></img>
        <h3 className="header">{data.label ?? data.name}</h3>
        <div className="content"></div>
      </FunctionBox>

      {!splitViewNode ? (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Aspect}</p>
        </BlockMessageBox>
      ) : (
        <FunctionBox
          location={isLocation}
          id={"function-block-" + splitViewNode.id}
        >
          <img src={ArrowIcon} alt="arrow" className="icon"></img>
          <h3 className="header">
            {splitViewNode.label ?? splitViewNode.name}
          </h3>
          <div className="content"></div>
        </FunctionBox>
      )}
    </>
  ) : (
    <FunctionBox id={"function-block-" + data.id}>
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label ?? data.name}</h3>
      <div className="content"></div>
    </FunctionBox>
  );
};

export default memo(FunctionBlock);
