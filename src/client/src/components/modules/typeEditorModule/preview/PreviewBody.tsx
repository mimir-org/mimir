import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { InterfaceIcon, TransportIcon } from "../../../../assets/icons/common";
import { Aspect, ObjectType } from "../../../../models";
export const PreviewBody = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  return (
    <PreviewArea>
      {state.createLibraryType.aspect === Aspect.NotSet &&
        state.createLibraryType.objectType === ObjectType.ObjectBlock && (
          <ObjectBlock />
        )}
      {state.createLibraryType.objectType !== ObjectType.ObjectBlock ? (
        <InfoWrapper>
          <p>{/* TODO: selected RDS */}</p>
          <p>{state.createLibraryType.name}</p>
        </InfoWrapper>
      ) : null}
      {state.createLibraryType.aspect === Aspect.Function &&
      state.createLibraryType.objectType === ObjectType.Transport ? (
        <img src={TransportIcon} className="object-icon" alt="transport-icon" />
      ) : state.createLibraryType.aspect === Aspect.Function &&
        state.createLibraryType.objectType === ObjectType.Interface ? (
        <img src={InterfaceIcon} className="object-icon" alt="interface-icon" />
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
