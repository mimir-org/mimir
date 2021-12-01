import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { OffPage, OffPageRequired } from "../../../../assets/icons/offpage";
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
  const node = nodes.find((n) => n.id === data.id);
  const type = "BlockOffPageNode-";
  const required = node?.connectionRequired;

  if (!node) return null;

  return (
    <OffPageBox id={type + node.id}>
      <img src={required ? OffPageRequired : OffPage} alt="menu" className="logo" />

      <HandleComponent
        nodes={nodes}
        size={{ width: node.width, height: node.height }}
        terminals={node.connectors}
        dispatch={dispatch}
        isVisible={false}
        offPage
      />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
