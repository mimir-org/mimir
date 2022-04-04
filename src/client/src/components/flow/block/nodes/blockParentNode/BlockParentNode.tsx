/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal } from "../../../helpers/Connectors";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnParentClick, OnChildClick } from "./handlers/";
import { FilterBlockTerminals } from "../helpers/FilterBlockTerminals";
import { Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { InitParentSize } from "./helpers/InitParentSize";

/**
 * Component for a ParentNode in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowParentNode.
 * @param data the data for the node.
 * @returns a Mimir ParentNode.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [terminals, setTerminals] = useState<Connector[]>([]);
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const node = project?.nodes?.find((x) => x.id === data.id);
  const selectedNode = project?.nodes.find((n) => n.isSelected);

  // useEffect(() => {
  //   SetZoomCenterLevel(secondaryNode !== null);
  // }, [secondaryNode]);

  // useEffect(() => {
  //   InitParentSize(node, dispatch);
  // }, []);

  // useEffect(() => {
  //   setTerminals(FilterBlockTerminals(node?.connectors, selectedNode, secondaryNode));
  // }, [selectedNode, secondaryNode, node?.connectors]);

  if (!node) return null;

  const inputTerminals = terminals.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputTerminals = terminals.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return (
    <BoxWrapper isElectro={isElectro}>
      {/* <HandleComponent node={node} terminals={inputTerminals} isInput /> */}
      <BlockParentComponent
        node={node}
        splitView={secondaryNode !== null}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        isNavigationActive={node.id !== secondaryNode?.id}
        onNavigateUpClick={() => OnParentClick(dispatch, node.id, project)}
        onNavigateDownClick={() => OnChildClick(dispatch, node.id, project)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, node, dispatch, project.edges)}
      />
      {/* <HandleComponent node={node} terminals={outputTerminals} /> */}
    </BoxWrapper>
  );
};

export default memo(BlockParentNode);
