/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/selectors";
import { FC, memo, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { OffPageInputIcon, OffPageOutputIcon } from "../../../../assets/icons/offpage";
import { HandleComponent } from "../terminals";
import { OffPageBox } from "./styled";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsTransport } from "../../helpers";
import { updateBlockPosition } from "../../../../redux/store/project/actions";
import { Size } from "../../../../compLibrary/size";

/**
 * Component for an offpage node in BlockView
 * @param params
 * @returns an offpage node that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const libOpen = useAppSelector(selectors.libOpenSelector);
  const explorerOpen = useAppSelector(selectors.explorerSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const nodes = project?.nodes;
  const node = nodes?.find((n) => n.id === data.id);
  const type = "BlockOffPageNode-";

  const offPageParent = GetParent(node);
  const parentBlockNode = GetParent(offPageParent);

  const inputConn = node?.connectors.find((conn) => IsInputTerminal(conn) && IsTransport(conn));
  const outputConn = node?.connectors.find((conn) => IsOutputTerminal(conn) && IsTransport(conn));
  const edgeInputConn = project?.edges?.find((edge) => edge.toConnector.id === inputConn?.id)?.toConnector;
  const edgeOutputConn = project?.edges?.find((edge) => edge.fromConnector.id === outputConn?.id)?.fromConnector;

  const terminal = edgeInputConn ?? edgeOutputConn;
  const iconColor = terminal?.color;

  // Update position relative to ParentBlockNode
  useEffect(() => {
    let xPos = IsInputTerminal(terminal)
      ? parentBlockNode?.positionBlockX + parentBlockNode?.width
      : parentBlockNode?.positionBlockX - 35;

    if (xPos > Size.BlockMaxWidth + parentBlockNode?.positionBlockX) xPos = Size.BlockMaxWidth + parentBlockNode?.positionBlockX;
    dispatch(updateBlockPosition(node?.id, xPos, node?.positionBlockY));
  }, [node?.positionBlockX, parentBlockNode?.width, parentBlockNode?.positionBlockX, libOpen, explorerOpen, secondaryNode]);

  if (!node) return null;

  return (
    <OffPageBox id={type + node.id}>
      {IsInputTerminal(terminal) ? (
        <OffPageInputIcon style={{ fill: iconColor }} className="logo" />
      ) : (
        <OffPageOutputIcon style={{ fill: iconColor }} className="logo" />
      )}
      <HandleComponent nodes={nodes} node={node} terminals={node.connectors} dispatch={dispatch} isVisible={false} offPage />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
