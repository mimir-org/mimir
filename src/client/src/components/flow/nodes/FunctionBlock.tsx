import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";

const FunctionBlock: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <div id={"function-block-" + data.id} className="function-block">
        <h3 className="function-block__header">{data.label ?? data.name}</h3>
        <div className="function-block__content"></div>
      </div>
    </>
  );
};

export default memo(FunctionBlock);
