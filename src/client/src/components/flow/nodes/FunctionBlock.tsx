import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { FlowBlockLocation } from "..";
import { ArrowIcon } from "../../../assets/icons/blockView";
import { TextResources } from "../../../assets/textResources";
import { Node, NODE_TYPE } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { GetReactFlowBoundingRectData } from "../helpers";
import {
  FunctionBox,
  LocationBox,
  MessageBox,
} from "../../../componentLibrary/blockView";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const splitViewNode = useSelector<RootState>(
    (state) => state.splitView.node
  ) as Node;

  const [width, height] = GetReactFlowBoundingRectData();
  let calculatedWidth = (width * 70) / 100;
  const calculatedHeight = (height * 80) / 120;

  if (splitView) calculatedWidth = calculatedWidth / 1.7;

  const isLocationNode = splitViewNode
    ? splitViewNode.type === NODE_TYPE.LOCATION
    : false;

  return splitView ? (
    <>
      <FunctionBox
        id={"function-block-" + data.id}
        width={calculatedWidth}
        height={calculatedHeight}
      >
        <img src={ArrowIcon} alt="arrow" className="icon"></img>
        <h3 className="header">{data.label ?? data.name}</h3>
        <div className="content"></div>
      </FunctionBox>

      {!splitViewNode ? (
        <MessageBox>
          <p>{TextResources.BlockView_Select_Aspect}</p>
        </MessageBox>
      ) : isLocationNode ? (
        <>
          <LocationBox width={calculatedWidth} height={calculatedHeight}>
            <FlowBlockLocation />
          </LocationBox>

          <FunctionBox
            id={"function-block-" + splitViewNode.id}
            width={calculatedWidth}
            height={calculatedHeight}
          >
            <img src={ArrowIcon} alt="arrow" className="icon"></img>
            <h3 className="header">
              {splitViewNode.label ?? splitViewNode.name}
            </h3>
            <div className="content"></div>
          </FunctionBox>
        </>
      ) : (
        <FunctionBox
          id={"function-block-" + splitViewNode.id}
          width={calculatedWidth}
          height={calculatedHeight}
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
    <FunctionBox
      id={"function-block-" + data.id}
      width={calculatedWidth}
      height={calculatedHeight}
    >
      <img src={ArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="header">{data.label ?? data.name}</h3>
      <div className="content"></div>
    </FunctionBox>
  );
};

export default memo(FunctionBlock);
