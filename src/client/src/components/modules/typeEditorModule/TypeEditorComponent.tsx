import red, { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MODULE_TYPE, VIEW_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/text";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { SetDarkModeColor } from "../../flow/helpers/common";
import { changeAllModulesVisibility } from "../../../redux/store/modules/actions";
import { TypeMode, ObjectType } from "../../../models/";
import { TypeEditorInputs } from "./";
import { RDSList, TerminalsList, AttributesList, TypePreview } from ".";
import {
  changeMode,
  getInitialData,
  getBlobData,
} from "../../../redux/store/typeEditor/actions";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  ChooseProperties,
} from "./styled";

export const TypeEditorComponent = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const aspect = state.createLibraryType.aspect;
  const objectType = state.createLibraryType.objectType;

  const onCloseEditor = () => {
    // dispatch(resetCreateLibrary());
    dispatch(changeMode(TypeMode.NotSet));
    dispatch(changeFlowView(MODULE_TYPE.TYPEEDITOR));
    push(`/home/${VIEW_TYPE.TREEVIEW}`);
  };

  useEffect(() => {
    const darkMode = red.store.getState().darkMode.active;
    SetDarkModeColor(darkMode);
    dispatch(getInitialData());
    dispatch(changeAllModulesVisibility(false, true));
    dispatch(getBlobData());
  }, [dispatch, aspect, objectType, state.createLibraryType.status]);

  return (
    <TypeEditorWrapper>
      <TypeEditorContent>
        <TypeEditorHeader>
          <p>{TextResources.TypeEditor}</p>
          <img src={CloseIcon} alt="close-window" onClick={onCloseEditor} />
        </TypeEditorHeader>
        <TypeEditorInputs state={state} dispatch={dispatch} />
        <ChooseProperties>
          <RDSList state={state} />
          <TerminalsList state={state} />
          {objectType === ObjectType.Interface ? null : (
            <AttributesList state={state} />
          )}
          <TypePreview state={state} />
        </ChooseProperties>
        {/* <TypeEditorInspector /> */}
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;
