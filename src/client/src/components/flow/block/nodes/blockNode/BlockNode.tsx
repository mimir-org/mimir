/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { libraryStateSelector, projectStateSelector, useAppDispatch, useAppSelector } from "store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "../../handle/HandleComponent";
import { FilterConnectors } from "../helpers/FilterConnectors";
import { OnConnectorClick } from "../handlers/OnConnectorClick";
import { Size } from "../../../../../assets/size/Size";
import { GetAspectColor } from "assets";
import { BlockNodeSize } from "../../../../../models/project";
import { SetChildNodeSize } from "./helpers/SetChildNodeSize";
import { BoxWrapper } from "../styled/BoxWrapper";
import { BlockChildComponent } from "./components/BlockChildComponent";
import { Connectors } from "../blockParentNode/BlockParentNode";
import { useOnAddTerminal, useOnRemoveTerminal } from "../../hooks";
import { AspectObject, ConnectorDirection } from "lib";
import { ConnectorTerminal } from "../../../../../lib/classes/Connector";
import { ProjectState } from "store/reducers/projectReducer";
import { LibraryState } from "store/reducers/libraryReducer";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param data the data for the node.
 * @returns a Mimir Node.
 */
const BlockNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const initialConnectors = { inputs: [], outputs: [] } as Connectors;
  const [connectors, setConnectors] = useState<Connectors>(initialConnectors);
  const initialSize = { width: Size.NODE_WIDTH, height: Size.NODE_HEIGHT } as BlockNodeSize;
  const [, setSize] = useState<BlockNodeSize>(initialSize);
  const projectState = useAppSelector<ProjectState>(projectStateSelector);
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);
  const project = projectState.project;
  // const isElectroView = useAppSelector(selectors.electroSelector);
  const selectedBlockNode = project?.aspectObjects?.find((n) => n.blockSelected);
  const terminalTypes = libraryState.terminalTypes;
  const libNodes = libraryState.aspectObjectTypes;

  const OnClickAddTerminal = (typeId: string, nodeId: string, direction: ConnectorDirection) => {
    return useOnAddTerminal(project, typeId, nodeId, terminalTypes, libNodes, direction, dispatch);
  };

  const OnClickRemoveTerminal = (nodeId: string, terminalId: string) => {
    return useOnRemoveTerminal(project, terminalId, nodeId, dispatch);
  };

  // Handle connectors
  useEffect(() => {
    setConnectors(
      FilterConnectors(
        data?.connectors.filter((x) => x instanceof ConnectorTerminal),
        selectedBlockNode
      )
    );
  }, [selectedBlockNode, data?.connectors]);

  // Update node size based on active connectors
  // useEffect(() => {
  //   setSize(SetChildNodeSize(connectors, isElectroView));
  // }, [isElectroView, connectors]);

  if (!data) return null;

  return (
    <BoxWrapper isElectro={false}>
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.inputs}
        isElectroView={false}
        dispatch={dispatch}
        isInput
      />
      <BlockChildComponent
        node={data}
        isElectroView={false}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputConnectors={connectors.inputs}
        outputConnectors={connectors.outputs}
        onConnectorClick={(conn, isInput, data) => OnConnectorClick(conn, isInput, data, dispatch, project?.connections)}
        onClickAddTerminal={OnClickAddTerminal}
        onClickRemoveTerminal={OnClickRemoveTerminal}
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.outputs}
        isElectroView={false}
        dispatch={dispatch}
        isInput={false}
      />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
