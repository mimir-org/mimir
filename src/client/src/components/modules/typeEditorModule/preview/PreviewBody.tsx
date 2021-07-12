import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transportIcon.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interfaceIcon.svg";
import { ObjectType } from "../../../../models";
import { IsLocationAspect, IsFunctionAspect } from "../helpers";

interface Props {
  state: TypeEditorState;
}

export const PreviewBody = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const showObjectBlock = () => {
    if (
      (IsLocationAspect(aspect) &&
        state.createLibraryType.locationType !== "") ||
      (IsFunctionAspect(aspect) && objectType === ObjectType.ObjectBlock)
    ) {
      return <ObjectBlock state={state} />;
    }
    return null;
  };

  const transportOrInterface = () => {
    if (IsFunctionAspect(aspect)) {
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
      {IsFunctionAspect(aspect) && objectType === ObjectType.Transport ? (
        <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
      ) : IsFunctionAspect(aspect) && objectType === ObjectType.Interface ? (
        <InterfaceIcon
          style={{ stroke: state.terminalColor, fill: state.terminalColor }}
        ></InterfaceIcon>
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
