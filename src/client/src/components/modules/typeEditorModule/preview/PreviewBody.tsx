import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { ReactComponent as TransportIcon } from "../../../../assets/icons/common/transportIcon.svg";
import { ReactComponent as InterfaceIcon } from "../../../../assets/icons/common/interfaceIcon.svg";
import { Aspect, ObjectType } from "../../../../models";

export const PreviewBody = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const showObjectBlock = () => {
    if (
      state.createLibraryType.aspect === Aspect.Location &&
      state.createLibraryType.locationType !== ""
    ) {
      return <ObjectBlock />;
    } else if (
      state.createLibraryType.aspect === Aspect.Function &&
      state.createLibraryType.objectType === ObjectType.ObjectBlock
    ) {
      return <ObjectBlock />;
    } else {
      return null;
    }
  };

  const transportOrInterface = () => {
    if (state.createLibraryType.aspect === Aspect.Function) {
      if (
        state.createLibraryType.objectType === ObjectType.Transport ||
        state.createLibraryType.objectType === ObjectType.Interface
      ) {
        return true;
      }
    } else {
      return false;
    }
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
      {state.createLibraryType.aspect === Aspect.Function &&
      state.createLibraryType.objectType === ObjectType.Transport ? (
        <TransportIcon style={{ fill: state.terminalColor }}></TransportIcon>
      ) : state.createLibraryType.aspect === Aspect.Function &&
        state.createLibraryType.objectType === ObjectType.Interface ? (
        <InterfaceIcon
          style={{ stroke: state.terminalColor, fill: state.terminalColor }}
        ></InterfaceIcon>
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
