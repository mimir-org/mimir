import red, { RootState } from "../../../redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { MODULE_TYPE, VIEW_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/text";
import { CloseIcon } from "../../../assets/icons/common";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { SetDarkModeColor } from "../../flow/helpers/common";
import { changeAllModulesVisibility } from "../../../redux/store/modules/actions";
import { TypeMode, ObjectType, LibraryFilter } from "../../../models/";
import { TypeEditorInputs } from "./";
import { FieldValidator, ModeEdit } from "./helpers";
import { RDSList, TerminalsList, AttributesList, TypePreview } from ".";
import {
  changeMode,
  chooseAspect,
  getInitialData,
  getBlobData,
  getSelectedNode,
  changeSelectedType,
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
  const location = useLocation();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const objectType = state.createLibraryType.objectType;
  const selectedType = location.state["selectedType"] as string;
  const mode = location.state["mode"] as TypeMode;
  let aspect = ModeEdit(mode)
    ? state.selectedNode.aspect
    : state.createLibraryType.aspect;

  const onCloseEditor = () => {
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
    dispatch(changeSelectedType(selectedType));
    dispatch(changeMode(mode));
    state.selectedType &&
      dispatch(getSelectedNode(state.selectedType, LibraryFilter.Node));
    dispatch(chooseAspect(mode, aspect));
  }, [dispatch, aspect, objectType, mode, selectedType, state.selectedType]);

  return (
    <TypeEditorWrapper>
      <TypeEditorContent>
        <TypeEditorHeader>
          <p>{TextResources.TypeEditor}</p>
          <img src={CloseIcon} alt="close-window" onClick={onCloseEditor} />
        </TypeEditorHeader>
        <TypeEditorInputs state={state} dispatch={dispatch} />
        <ChooseProperties>
          <RDSList
            state={state}
            disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
          />
          <TerminalsList
            state={state}
            disabled={FieldValidator(state, "terminals")}
          />
          {objectType === ObjectType.Interface ? null : (
            <AttributesList
              state={state}
              disabled={FieldValidator(state, "terminals")}
            />
          )}
          <TypePreview state={state} disabled={FieldValidator(state, "add")} />
        </ChooseProperties>
        {/* <TypeEditorInspector /> */}
      </TypeEditorContent>
    </TypeEditorWrapper>
  );
};

export default TypeEditorComponent;
