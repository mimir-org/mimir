/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo } from "react";
import { NodeProps } from "react-flow-renderer";
import { libraryStateSelector, projectSelector, useAppDispatch, useAppSelector } from "store";
import { AspectColorType } from "../../../../../models";
import { HandleComponent } from "./HandleComponent";
import { GetAspectColor } from "assets";
import { BoxWrapper } from "./BlockNode.styled";
import { BlockChildComponent } from "./BlockChildComponent";
import { AspectObject, ConnectorDirection, ConnectorTerminal, Project } from "lib";
import { LibraryState } from "store/reducers/libraryReducer";
import { onTerminalAdd, onTerminalChecked, onTerminalRemove } from "components/handlers/ProjectHandlers";

/**
 * Component for a child Node in BlockView.
 * This component lives in conjunction with the FlowNode from BuildFlowChildNode.
 * @param props the data for the node.
 * @returns a Mimir Node.
 */
const BlockNode: FC<NodeProps<AspectObject>> = (props: NodeProps<AspectObject>) => {
  const dispatch = useAppDispatch();
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);
  const project = useAppSelector<Project>(projectSelector);
  // const isElectroView = useAppSelector(selectors.electroSelector);
  const terminalTypes = libraryState.terminalTypes;

  const onClickAddTerminal = (terminalId: string) => {
    onTerminalAdd(props.data.id, terminalTypes, terminalId, project, dispatch);
  };

  const onClickRemoveTerminal = (terminalId: string) => {
    onTerminalRemove(props.data.id, terminalId, dispatch);
  };

  const onClickTerminalChecked = (terminalId: string, checked: boolean) => {
    onTerminalChecked(project, props.data.id, terminalId, checked, dispatch);
  };

  if (!props.data) return null;

  return (
    <BoxWrapper isElectro={false}>
      <HandleComponent
        node={props.data}
        connectors={props.data.connectors.filter(
          (x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Input && x.selected
        )}
        isElectroView={false}
      />
      <BlockChildComponent
        node={props.data}
        isElectroView={false}
        colorMain={GetAspectColor(props.data, AspectColorType.Main)}
        colorSelected={GetAspectColor(props.data, AspectColorType.Selected)}
        inputConnectors={props.data.connectors.filter(
          (x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Input
        )}
        outputConnectors={props.data.connectors.filter(
          (x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Output
        )}
        onClickTerminalChecked={onClickTerminalChecked}
        onClickAddTerminal={onClickAddTerminal}
        onClickRemoveTerminal={onClickRemoveTerminal}
      />
      <HandleComponent
        node={props.data}
        connectors={props.data.connectors.filter(
          (x) => x instanceof ConnectorTerminal && x.direction === ConnectorDirection.Output && x.selected
        )}
        isElectroView={false}
      />
    </BoxWrapper>
  );
};

export default memo(BlockNode);
