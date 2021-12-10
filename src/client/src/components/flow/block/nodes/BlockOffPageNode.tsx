import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { projectSelector, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { OffPageIcon } from "../../../../assets/icons/offpage";
import { HandleComponent } from "../terminals";
import { OffPageBox } from "./styled";
import { IsInputTerminal, IsTransport } from "../../helpers";

/**
 * Component for an offpage node in BlockView
 * @param params
 * @returns an offpage node that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const nodes = project?.nodes;
  const node = nodes?.find((n) => n.id === data.id);
  const type = "BlockOffPageNode-";

  if (!node) return null;

  const terminal = node.connectors.find((c) => IsInputTerminal(c) && IsTransport(c));
  const iconColor = terminal?.color;

  return (
    <OffPageBox id={type + node.id}>
      <OffPageIcon style={{ fill: iconColor }} className="logo" />
      <HandleComponent nodes={nodes} node={node} terminals={node.connectors} dispatch={dispatch} isVisible={false} offPage />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
