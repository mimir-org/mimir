import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { projectSelector, useAppSelector } from "../../../../../redux/store";
import { OffPageRequired } from "../../../../../assets/icons/offpage";
import { HandleComponent } from "../../terminals";

const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes;
  const type = "BlockOffPageNode-";

  return (
    <div id={type + data.id}>
      <img src={OffPageRequired} alt="menu" style={{ pointerEvents: "none" }} />

      <HandleComponent
        nodes={nodes}
        height={data?.length}
        width={data?.width}
        terminals={data.connectors}
        parent={false}
        electro={false}
      />
    </div>
  );
};

export default memo(BlockOffPageNode);
