/* eslint-disable react-hooks/exhaustive-deps */
import * as selectors from "./helpers/ParentSelectors";
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../../handle/HandleComponent";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnBlockParentClick, OnBlockChildClick } from "./handlers/OnClick";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { InitParentSize } from "./helpers/InitParentSize";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../../helpers/Connectors";

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
  const isElectroView = useAppSelector(selectors.electroSelector);
  const selectedBlockNode = project?.nodes?.find((n) => n.blockSelected);

  useEffect(() => {
    InitParentSize(data, dispatch);
  }, []);

  useEffect(() => {
    setConnectors(FilterConnectors(data?.connectors, selectedBlockNode));
  }, [data?.connectors, selectedBlockNode]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={isElectroView}>
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.outputs.filter((x) => IsTerminal(x) && x.isProxy)}
        isElectroView={isElectroView}
        dispatch={dispatch}
        isInput
        isParent
      />
      <BlockParentComponent
        node={data}
        isElectroView={isElectroView}
        inputConnectors={connectors.inputs.filter((x) => IsTerminal(x) && !x.isProxy)}
        outputConnectors={connectors.outputs.filter((x) => IsTerminal(x) && !x.isProxy)}
        isNavigationActive={true}
        onNavigateUpClick={() => OnBlockParentClick(dispatch, data)}
        onNavigateDownClick={() => OnBlockChildClick(dispatch, data.id)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data, dispatch, project?.edges)}
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.inputs.filter((x) => IsTerminal(x) && x.isProxy)}
        isElectroView={isElectroView}
        dispatch={dispatch}
        isInput={false}
        isParent
      />
    </BoxWrapper>
  );
};

export default memo(BlockParentNode);
