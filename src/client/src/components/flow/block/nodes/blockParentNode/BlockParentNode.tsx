/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent } from "../../handle/HandleComponent";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { OnBlockParentClick, OnBlockChildClick } from "./handlers/OnClick";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { projectStateSelector, useAppDispatch, useAppSelector } from "store";
import { BlockParentComponent } from "./components/BlockParentComponent";
import { BoxWrapper } from "../styled/BoxWrapper";
import { AspectObject, Connector } from "lib";
import { ConnectorTerminal } from "../../../../../lib/classes/Connector";
import { ProjectState } from "store/reducers/projectReducer";

export type Connectors = { inputs: Connector[]; outputs: Connector[] };

/**
 * Component for a ParentNode in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowParentNode.
 * @param data the data for the node.
 * @returns a Mimir ParentNode.
 */
const BlockParentNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialConnectors = { inputs: [], outputs: [] } as Connectors;
  const [connectors, setConnectors] = useState<Connectors>(initialConnectors);

  const projectState = useAppSelector<ProjectState>(projectStateSelector);

  const project = projectState.project;
  const selectedBlockNode = project?.aspectObjects?.find((n) => n.blockSelected);

  useEffect(() => {
    setConnectors(FilterConnectors(data?.connectors, selectedBlockNode));
  }, [data?.connectors, selectedBlockNode]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={false}>
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.outputs.filter((x) => x instanceof ConnectorTerminal)}
        isElectroView={false}
        dispatch={dispatch}
        isInput
        isParent
      />
      <BlockParentComponent
        node={data}
        isElectroView={false}
        inputConnectors={connectors.inputs.filter((x) => x instanceof ConnectorTerminal)}
        outputConnectors={connectors.outputs.filter((x) => x instanceof ConnectorTerminal)}
        isNavigationActive={true}
        onNavigateUpClick={() => OnBlockParentClick(dispatch, data)}
        onNavigateDownClick={() => OnBlockChildClick(dispatch, data.id)}
        onConnectorClick={(conn, isInput) => OnConnectorClick(conn, isInput, data, dispatch, project?.connections)}
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.inputs.filter((x) => x instanceof ConnectorTerminal)}
        isElectroView={false}
        dispatch={dispatch}
        isInput={false}
        isParent
      />
    </BoxWrapper>
  );
};

export default memo(BlockParentNode);
