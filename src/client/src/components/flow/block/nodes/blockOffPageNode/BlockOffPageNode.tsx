/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/OffPageSelectors";
import { FC, memo, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { HandleComponent } from "../../handle";
import { IsInputConnector, IsOutputConnector, IsTerminal } from "../../../helpers/Connectors";
import { OffPageBox } from "./BlockOffPageNode.styled";
import { GetOffPageIcon, UpdateOffPagePosition } from "./helpers";
import { Color } from "../../../../../assets/color/Color";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { Node, Terminal } from "@mimirorg/modelbuilder-types";

/**
 * Component for an OffPageNode in BlockView.
 * @param params
 * @returns an OffPageNode that can be connected to other nodes.
 */
const BlockOffPageNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroViewSelector);
  const size = useAppSelector(selectors.nodeSizeSelector);
  const edge = project?.edges?.find((x) => IsTerminal(x.fromConnector) && (x.toNodeId === data.id || x.fromNodeId === data.id));

  const intputTerminal = data?.connectors.find((c) => IsInputConnector(c) && IsTerminal(c)) as Terminal;
  const outputTerminal = data?.connectors.find((c) => IsOutputConnector(c) && IsTerminal(c)) as Terminal;

  const isTarget = edge?.toNodeId === data.id;
  const offPageTerminal = isTarget ? intputTerminal : outputTerminal;

  // The position of the OffPageNode is based on its grandparent => the large parentBlockNode
  const offPageParent = project.nodes.find((n) => n.id === data.parentNodeId);
  const offPageGrandParent = project.nodes.find((n) => n.id === offPageParent?.parentNodeId);

  const parentNodeTerminal = isTarget
    ? offPageParent?.connectors.find((c) => c.id === edge?.fromConnectorId)
    : offPageParent?.connectors.find((c) => c.id === edge?.toConnectorId);

  // Update position relative to ParentBlockNode
  useEffect(() => {
    UpdateOffPagePosition(data, offPageGrandParent, offPageTerminal, size, isElectro, dispatch);
  }, [data?.positionBlockX, size, offPageGrandParent?.positionBlockX, secondaryNode, isElectro]);

  if (!data || !offPageParent || !offPageGrandParent) return null;

  const iconColor = offPageTerminal?.color ?? Color.BLACK;
  const OffPageIcon = GetOffPageIcon(offPageTerminal, parentNodeTerminal);

  const inputConnectors = data.connectors.filter((c) => IsInputConnector(c));
  const outputConnectors = data.connectors.filter((c) => IsOutputConnector(c));

  return (
    <Tooltip content={data.label} placement={"top"} offset={[0, 10]}>
      <OffPageBox id={`BlockOffPageNode-${data.id}`} selected={data.selected} color={iconColor}>
        <HandleComponent
          node={data}
          project={project}
          connectors={inputConnectors}
          isElectro={isElectro}
          dispatch={dispatch}
          isInput
          isOffPage
        />
        <OffPageIcon style={{ fill: iconColor }} className="icon" />
        <HandleComponent
          node={data}
          project={project}
          connectors={outputConnectors}
          isElectro={isElectro}
          dispatch={dispatch}
          isInput={false}
          isOffPage
        />
      </OffPageBox>
    </Tooltip>
  );
};

export default memo(BlockOffPageNode);
