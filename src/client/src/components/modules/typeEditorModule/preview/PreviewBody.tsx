import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transportIcon.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interfaceIcon.svg";
import {
  IsLocation,
  IsFunction,
  IsObjectBlock,
  IsTransport,
  IsInterface,
} from "../helpers";

interface Props {
  state: TypeEditorState;
}

export const PreviewBody = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const showObjectBlock = () => {
    if (
      (IsLocation(aspect) && state.createLibraryType.locationType !== "") ||
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
