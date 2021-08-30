import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transport.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interface.svg";
import {
  IsLocation,
  IsFunction,
  IsObjectBlock,
  IsTransport,
  IsInterface,
  ModeEdit,
} from "../helpers";

interface Props {
  state: TypeEditorState;
}

export const PreviewBody = ({ state }: Props) => {
  const mode = state.mode;
  const aspect = ModeEdit(mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;
  const objectType = ModeEdit(mode)
    ? state.selectedNode.objectType
    : state.createLibraryType.objectType;
  const locationType = ModeEdit(mode)
    ? state.selectedNode.locationType
    : state.createLibraryType.locationType;

  const showObjectBlock = () => {
    if (
      (IsLocation(aspect) && locationType !== "") ||
      (IsFunction(aspect) && IsObjectBlock(objectType))
    ) {
      return <ObjectBlock state={state} />;
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunction(aspect)) {
      return IsTransport(objectType) || IsInterface(objectType);
    }
    return false;
  };

  return (
    <PreviewArea>
      {showObjectBlock()}
      {transportOrInterface() && (
        <InfoWrapper>
          <p>{state.rdsName}</p>
          <p>{state.createLibraryType.name}</p>
        </InfoWrapper>
      )}
      {IsFunction(aspect) && IsTransport(objectType) && (
        <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
      )}
      {IsFunction(aspect) && IsInterface(objectType) && (
        <InterfaceIcon
          style={{ stroke: state.terminalColor, fill: state.terminalColor }}
        ></InterfaceIcon>
      )}
    </PreviewArea>
  );
};

export default PreviewBody;
