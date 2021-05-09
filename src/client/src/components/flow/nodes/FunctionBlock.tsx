import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";
import { BlockviewArrowIcon } from "../../../assets/icons";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  return (
    <div id={"function-block-" + data.id} className="function-block">
      <img src={BlockviewArrowIcon} alt="arrow" className="icon"></img>
      <h3 className="function-block__header">{data.label ?? data.name}</h3>
      <div className="function-block__content"></div>
    </div>
  );
};

export default memo(FunctionBlock);
