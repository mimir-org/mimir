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

  return (
    <PreviewArea>
      {state.createLibraryType.aspect !== Aspect.NotSet &&
        state.createLibraryType.objectType === ObjectType.ObjectBlock && (
          <ObjectBlock />
        )}
      {state.createLibraryType.objectType !== ObjectType.ObjectBlock ? (
        <InfoWrapper>
          <p>{state.rdsName}</p>
          <p>{state.createLibraryType.name}</p>
        </InfoWrapper>
      ) : null}
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
