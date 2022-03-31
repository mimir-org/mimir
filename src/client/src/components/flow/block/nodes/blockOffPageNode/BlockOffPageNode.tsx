/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/OffPageSelectors";
import { FC, memo, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { HandleComponent } from "../../handle";
import { IsInputTerminal, IsOutputTerminal, IsTransport } from "../../../helpers/CheckConnectorTypes";
import { OffPageBox } from "./BlockOffPageNode.styled";
import { GetOffPageIcon, UpdateOffPagePosition } from "./helpers";
import { Connector } from "../../../../../models";
import { IsProduct } from "../../../../../helpers/CheckTypes";
import { Color } from "../../../../../compLibrary/colors/Color";
import { GetParent } from "../../../helpers";
import { GetSelectedBlockNode } from "../../../../../helpers";

/**
 * Component for an offpage node in BlockView
 * @param params
 * @returns an offpage node that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const edge = project?.edges?.find((x) => IsTransport(x.fromConnector) && (x.toNodeId === data.id || x.fromNodeId === data.id));

  const intputTerminal = data?.connectors.find((c: Connector) => IsInputTerminal(c) && IsTransport(c));
  const outputTerminal = data?.connectors.find((c: Connector) => IsOutputTerminal(c) && IsTransport(c));

  const isTarget = edge?.toNodeId === data.id;
  const offPageTerminal = isTarget ? intputTerminal : outputTerminal;

  // The position of the OffPageNode is based on its grandparent => the large parentBlockNode
  const offPageParent = GetParent(data);
  const parentBlockNode = GetParent(offPageParent);

  const parentNodeTerminal = isTarget
    ? offPageParent?.connectors.find((c) => c.id === edge?.fromConnectorId)
    : offPageParent?.connectors.find((c) => c.id === edge?.toConnectorId);

  // Update position relative to ParentBlockNode
  useEffect(() => {
    if (!IsProduct(parentBlockNode)) UpdateOffPagePosition(data, parentBlockNode, offPageTerminal, size, dispatch);
  }, [data?.positionBlockX, size, parentBlockNode?.positionBlockX, secondaryNode]);

  if (!data || !offPageParent || !parentBlockNode) return null;

  const iconColor = offPageTerminal?.color ?? Color.BLACK;
  const OffPageIcon = GetOffPageIcon(offPageTerminal, parentNodeTerminal);

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
