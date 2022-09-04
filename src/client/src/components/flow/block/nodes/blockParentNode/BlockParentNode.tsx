/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../../handle";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnBlockParentClick, OnBlockChildClick } from "./handlers/OnClick";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { InitParentSize } from "./helpers/InitParentSize";
import { IsPartOfRelation } from "../../../helpers/Connectors";
import { Connector, Node } from "@mimirorg/modelbuilder-types";

export type Connectors = { inputs: Connector[]; outputs: Connector[] };

/**
 * Component for a ParentNode in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowParentNode.
 * @param data the data for the node.
 * @returns a Mimir ParentNode.
 */
const BlockParentNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialConnectors = { inputs: [], outputs: [] } as Connectors;
  const [connectors, setConnectors] = useState<Connectors>(initialConnectors);
  const project = useAppSelector(selectors.projectSelector);
  const secondaryNode = useAppSelector(selectors.secondaryNodeSelector);
  const isElectro = useAppSelector(selectors.electroSelector);
  const selectedBlockNode = project?.nodes?.find((n) => n.blockSelected);

  useEffect(() => {
    InitParentSize(data, dispatch);
  }, []);

  useEffect(() => {
    setConnectors(FilterConnectors(data?.connectors, selectedBlockNode, secondaryNode));
  }, [data?.connectors, selectedBlockNode, secondaryNode]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectro}>
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.inputs}
        isElectro={isElectro}
        dispatch={dispatch}
        isInput
        isParent
      />
      <BlockParentComponent
        node={data}
        splitView={secondaryNode != null}
        inputConnectors={connectors.inputs.filter((c) => !IsPartOfRelation(c))}
        outputConnectors={connectors.outputs.filter((c) => !IsPartOfRelation(c))}
        isNavigationActive={data.id !== secondaryNode?.id}
        onNavigateUpClick={() => OnBlockParentClick(dispatch, data)}
        onNavigateDownClick={() => OnBlockChildClick(dispatch, data.id)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data.id, dispatch)}
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.outputs}
        isElectro={isElectro}
        dispatch={dispatch}
        isParent
      />
    </BoxWrapper>
  );
};

export default memo(BlockParentNode);
