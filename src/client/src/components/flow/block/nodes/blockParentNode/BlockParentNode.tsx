/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnBlockParentClick, OnBlockChildClick } from "./handlers/OnClick";
import { FilterTerminals } from "../helpers/FilterTerminals";
import { Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { InitParentSize } from "./helpers/InitParentSize";

export type Terminals = { in: Connector[]; out: Connector[] };

/**
 * Component for a ParentNode in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowParentNode.
 * @param data the data for the node.
 * @returns a Mimir ParentNode.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialTerminals = { in: [], out: [] } as Terminals;
  const [terminals, setTerminals] = useState<Terminals>(initialTerminals);
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const selectedNode = project?.nodes?.find((n) => n.selected);

  useEffect(() => {
    InitParentSize(data, dispatch);
  }, []);

  useEffect(() => {
    setTerminals(FilterTerminals(data?.connectors, selectedNode, secondaryNode));
  }, [data?.connectors, selectedNode, secondaryNode]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent node={data} terminals={terminals.in} isInput />
      <BlockParentComponent
        node={data}
        splitView={secondaryNode !== null}
        inputTerminals={terminals.in}
        outputTerminals={terminals.out}
        isNavigationActive={data.id !== secondaryNode?.id}
        onNavigateUpClick={() => OnBlockParentClick(dispatch, data.id)}
        onNavigateDownClick={() => OnBlockChildClick(dispatch, data.id)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data.id, dispatch)}
      />
      <HandleComponent node={data} terminals={terminals.out} />
    </BoxWrapper>
  );
};

export default memo(BlockParentNode);
