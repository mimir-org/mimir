import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { ArrowIcon } from "../../../assets/icons/blockView";
import { TextResources } from "../../../assets/textResources";
import { FunctionBox, MessageBox } from "../../../componentLibrary/blockView";
import { RootState } from "../../../redux/store";
import { GetReactFlowBoundingRectData } from "../helpers";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  const splitView = useSelector<RootState>((state) => state.splitView.visible);
  const [width, height] = GetReactFlowBoundingRectData();
  let calculatedWidth = (width * 70) / 100;
  const calculatedHeight = (height * 80) / 100;
  if (splitView) calculatedWidth = calculatedWidth / 1.5;

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

      <MessageBox>
        <p>{TextResources.BlockView_Select_Aspect}</p>
      </MessageBox>
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
