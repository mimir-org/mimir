import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { projectSelector, useAppSelector } from "../../../../../redux/store";
import { OffPageRequired } from "../../../../../assets/icons/offpage";
import { HandleComponent } from "../../terminals";
import { OffPageBox } from "./styled";

const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes;
  const type = "BlockOffPageNode-";

  return (
    <OffPageBox id={type + data.id}>
      <img src={OffPageRequired} alt="menu" className="logo" />

      <HandleComponent
        nodes={nodes}
        length={data?.length}
        width={data?.width}
        terminals={data.connectors}
        parent={false}
        electro={false}
      />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
