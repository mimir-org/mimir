import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { Node } from "../../../../../models";
import { OffPageRequired } from "../../../../../assets/icons/offpage";
import { HandleComponent } from "../../terminals";

const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const nodes = useSelector<RootState>((s) => s.projectState.project.nodes) as Node[];
  const type = "BlockOffPageNode-";

  return (
    <div id={type + data.id}>
      <img src={OffPageRequired} alt="menu" style={{ pointerEvents: "none" }} />

      <HandleComponent
        node={data}
        nodes={nodes}
        length={data?.length}
        width={data?.width}
        terminals={data.connectors}
        parent={false}
        splitView={false}
        electro={false}
        mainConnectNode={false}
      />
    </div>
  );
};

export default memo(BlockOffPageNode);
