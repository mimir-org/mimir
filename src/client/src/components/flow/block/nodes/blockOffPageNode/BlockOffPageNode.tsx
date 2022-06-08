/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/OffPageSelectors";
import { FC, memo, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { HandleComponent } from "../../handle";
import { IsInputTerminal, IsOutputTerminal, IsTransport } from "../../../helpers/Connectors";
import { OffPageBox } from "./BlockOffPageNode.styled";
import { GetOffPageIcon, UpdateOffPagePosition } from "./helpers";
import { Project } from "../../../../../models";
import { Color } from "../../../../../assets/color/Color";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { Connector, Node } from "@mimirorg/modelbuilder-types";

/**
 * Component for an OffPageNode in BlockView.
 * @param params
 * @returns an OffPageNode that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector) as Project;
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const edge = project?.edges?.find((x) => IsTransport(x.fromConnector) && (x.toNodeId === data.id || x.fromNodeId === data.id));

  const intputTerminal = data?.connectors.find((c: Connector) => IsInputTerminal(c) && IsTransport(c));
  const outputTerminal = data?.connectors.find((c: Connector) => IsOutputTerminal(c) && IsTransport(c));

  const isTarget = edge?.toNodeId === data.id;
  const offPageTerminal = isTarget ? intputTerminal : outputTerminal;

  // The position of the OffPageNode is based on its grandparent => the large parentBlockNode
  const offPageParent = project.nodes.find((n) => n.id === data.parentNodeId);
  const offPageGrandParent = project.nodes.find((n) => n.id === offPageParent?.parentNodeId);

  const parentNodeTerminal = isTarget
    ? offPageParent?.connectors.find((c: Connector) => c.id === edge?.fromConnectorId)
    : offPageParent?.connectors.find((c: Connector) => c.id === edge?.toConnectorId);

  // Update position relative to ParentBlockNode
  useEffect(() => {
    UpdateOffPagePosition(data, offPageGrandParent, offPageTerminal, size, dispatch);
  }, [data?.positionBlockX, size, offPageGrandParent?.positionBlockX, secondaryNode]);

  if (!data || !offPageParent || !offPageGrandParent) return null;

  const iconColor = offPageTerminal?.color ?? Color.BLACK;
  const OffPageIcon = GetOffPageIcon(offPageTerminal, parentNodeTerminal);

  const inputTerminals = data.connectors.filter((t: Connector) => IsInputTerminal(t));
  const outputTerminals = data.connectors.filter((t: Connector) => IsOutputTerminal(t));

  return (
    <Tooltip content={data.label} placement={"top"} offset={[0, 10]}>
      <OffPageBox id={`BlockOffPageNode-${data.id}`} selected={data.selected} color={iconColor}>
        <HandleComponent
          node={data}
          project={project}
          terminals={inputTerminals}
          isElectro={isElectro}
          dispatch={dispatch}
          isOffPage
        />
        <OffPageIcon style={{ fill: iconColor }} className="icon" />
        <HandleComponent
          node={data}
          project={project}
          terminals={outputTerminals}
          isElectro={isElectro}
          dispatch={dispatch}
          isOffPage
        />
      </OffPageBox>
    </Tooltip>
  );
};

export default memo(BlockOffPageNode);
