import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { OffPageRequired } from "../../../../assets/icons/offpage";
import { HandleComponent } from "../terminals";
import { OffPageBox } from "./styled";

/**
 * Component for an offpage node in BlockView
 * @param params
 * @returns an offpage node that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes;
  const type = "BlockOffPageNode-";

  return (
    <OffPageBox id={type + data.id}>
      <img src={OffPageRequired} alt="menu" className="logo" />

      <HandleComponent
        nodes={nodes}
        height={data?.height}
        width={data?.width}
        terminals={data.connectors}
        isParent={false}
        electro={false}
        dispatch={dispatch}
      />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
