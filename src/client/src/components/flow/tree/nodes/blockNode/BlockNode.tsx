/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { libraryStateSelector, projectStateSelector, useAppDispatch, useAppSelector } from "store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "./HandleComponent";
import { OnConnectorClick } from "../../../block/nodes/handlers/OnConnectorClick";
import { GetAspectColor } from "assets";
import { BoxWrapper } from "./BlockNode.styled";
import { BlockChildComponent } from "./BlockChildComponent";
import { useOnAddTerminal } from "../../../block/hooks";
import { AspectObject, ConnectorDirection, Connector } from "lib";
import { ProjectState } from "store/reducers/projectReducer";
import { LibraryState } from "store/reducers/libraryReducer";
import { onTerminalRemove } from "components/handlers/ProjectHandlers";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param data the data for the node.
 * @returns a Mimir Node.
 */
const BlockNode: FC<NodeProps<AspectObject>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [connectors, _] = useState<Connector[]>(data.connectors);
  const projectState = useAppSelector<ProjectState>(projectStateSelector);
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);
  const project = projectState.project;
  // const isElectroView = useAppSelector(selectors.electroSelector);
  const terminalTypes = libraryState.terminalTypes;
  const libNodes = libraryState.aspectObjectTypes;

  const OnClickAddTerminal = (typeId: string, nodeId: string, direction: ConnectorDirection) => {
    //onTerminalAdd(nodeId, libraryState.terminalTypes)
    return useOnAddTerminal(project, typeId, nodeId, terminalTypes, libNodes, direction, dispatch);
  };

  const OnClickRemoveTerminal = (nodeId: string, terminalId: string) => {
    onTerminalRemove(nodeId, terminalId, dispatch);
  };

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
        connectors={connectors.filter((x) => x.direction === ConnectorDirection.Input)}
        isElectroView={false}
        dispatch={dispatch}
        isInput
      />
      <BlockChildComponent
        node={data}
        isElectroView={false}
        colorMain={GetAspectColor(data, AspectColorType.Main)}
        colorSelected={GetAspectColor(data, AspectColorType.Selected)}
        inputConnectors={connectors.filter((x) => x.direction === ConnectorDirection.Input)}
        outputConnectors={connectors.filter((x) => x.direction === ConnectorDirection.Output)}
        onConnectorClick={(conn, isInput, data) => OnConnectorClick(conn, isInput, data, dispatch, project?.connections)}
        onClickAddTerminal={OnClickAddTerminal}
        onClickRemoveTerminal={OnClickRemoveTerminal}
      />
      <HandleComponent
        node={data}
        project={project}
        connectors={connectors.filter((x) => x.direction === ConnectorDirection.Output)}
        isElectroView={false}
        dispatch={dispatch}
        isInput={false}
      />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
