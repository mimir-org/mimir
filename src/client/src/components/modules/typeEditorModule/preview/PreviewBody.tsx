import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transportIcon.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interfaceIcon.svg";
import { Aspect, ObjectType } from "../../../../models";

interface Props {
  state: TypeEditorState;
}

export const PreviewBody = ({ state }: Props) => {
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const showObjectBlock = () => {
    if (
      (aspect === Aspect.Location &&
        state.createLibraryType.locationType !== "") ||
      (aspect === Aspect.Function && objectType === ObjectType.ObjectBlock)
    ) {
      return <ObjectBlock state={state} />;
    }
    return null;
  };

  const transportOrInterface = () => {
    if (aspect === Aspect.Function) {
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
      {aspect === Aspect.Function && objectType === ObjectType.Transport ? (
        <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
      ) : aspect === Aspect.Function && objectType === ObjectType.Interface ? (
        <InterfaceIcon
          style={{ stroke: state.terminalColor, fill: state.terminalColor }}
        ></InterfaceIcon>
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
