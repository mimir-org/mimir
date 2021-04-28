import { memo, FC } from "react";
import { NodeProps } from "react-flow-renderer";

const Function_block: FC<NodeProps> = ({ data }) => {
  //   var x = document.querySelectorAll(".react-flow").forEach((x) => {
  //     console.log(x);
  //   });

  return (
    <>
      <div id={"function-block-" + data.id} className="function-block">
        <h3 className="function-block__header">{data.label ?? data.name}</h3>
        <div className="function-block__content"></div>
      </div>
    </>
  );
};

export default memo(Function_block);
