import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transportIcon.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interfaceIcon.svg";
import { ObjectType } from "../../../../models";
import { IsLocation, IsFunction } from "../helpers";

interface Props {
  state: TypeEditorState;
}

export const PreviewBody = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const showObjectBlock = () => {
    if (
      (IsLocation(aspect) && state.createLibraryType.locationType !== "") ||
      (IsFunction(aspect) && objectType === ObjectType.ObjectBlock)
    ) {
      return <ObjectBlock state={state} />;
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunction(aspect)) {
      return (
        objectType === ObjectType.Transport ||
        objectType === ObjectType.Interface
      );
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
      {IsFunction(aspect) && objectType === ObjectType.Transport ? (
        <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
      ) : IsFunction(aspect) && objectType === ObjectType.Interface ? (
        <InterfaceIcon
          style={{ stroke: state.terminalColor, fill: state.terminalColor }}
        ></InterfaceIcon>
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
