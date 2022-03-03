/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/OffPageSelectors";
import { FC, memo, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { HandleComponent } from "../../handle";
import { OffPageBox } from "./styled/OffPageBox";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsTransport } from "../../../helpers";
import { GetOffPageIcon, UpdateOffPagePosition } from "./helpers";
import { Connector } from "../../../../../models";
import { GetSelectedBlockNode } from "../../../../../helpers";

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
  const size = useAppSelector(selectors.nodeSizeSelector);

  const inputTerminal = data?.connectors.find((c: Connector) => IsInputTerminal(c) && IsTransport(c));
  const outputTerminal = data?.connectors.find((c: Connector) => IsOutputTerminal(c) && IsTransport(c));

  const edge = project?.edges?.find((x) => IsTransport(x.fromConnector) && (x.toNodeId === data.id || x.fromNodeId === data.id));
  const isTarget = edge?.toNodeId === data.id;
  const offPageTerminal = isTarget ? inputTerminal : outputTerminal;

  const offPageParent = GetParent(data);
  const parentBlockNode = GetParent(offPageParent);

  const parentTerminal = isTarget
    ? offPageParent?.connectors.find((c) => c.id === edge?.fromConnectorId)
    : offPageParent?.connectors.find((c) => c.id === edge?.toConnectorId);

  const iconColor = offPageTerminal?.color;

  // Update position relative to ParentBlockNode
  useEffect(() => {
    UpdateOffPagePosition(data, parentBlockNode, offPageTerminal, size, dispatch);
  }, [data?.positionBlockX, size, parentBlockNode?.positionBlockX, libOpen, explorerOpen, secondaryNode]);

  if (!data) return null;

  const OffPageIcon = GetOffPageIcon(offPageTerminal, parentTerminal);
  const inputTerminals = data.connectors.filter((t: Connector) => IsInputTerminal(t));
  const outputTerminals = data.connectors.filter((t: Connector) => IsOutputTerminal(t));

  return (
    <OffPageBox id={"BlockOffPageNode-" + data.id} isSelected={data === GetSelectedBlockNode()} color={iconColor}>
      <HandleComponent node={data} terminals={inputTerminals} offPage />
      <OffPageIcon style={{ fill: iconColor }} className="icon" />
      <HandleComponent node={data} terminals={outputTerminals} offPage />
    </OffPageBox>
  );
};

export default memo(BlockOffPageNode);
