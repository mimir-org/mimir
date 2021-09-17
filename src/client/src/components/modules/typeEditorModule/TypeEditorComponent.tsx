import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TerminalTypeItem } from "../../../models";
import { TextResources } from "../../../assets/text";
import { AddIcon, CheckIcon, CloseIcon } from "../../../assets/icons/common";
import { TypeEditorList, TypeEditorInputs, TypePreview } from "./";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { RootState } from "../../../redux/store";
import { ListType } from "./TypeEditorList";
import { setModulesVisibility } from "../../../redux/store/modules/actions";
import {
  closeTypeEditor,
  getInitialData,
  getBlobData,
  updateValue,
  addTerminalType,
  removeTerminalType,
  updateTerminalType,
  saveLibraryType,
} from "../../../redux/store/typeEditor/actions";
import {
  GetSelectedRds,
  GetSelectedTerminal,
  IsLocation,
  IsInterface,
  IsObjectBlock,
  IsFunction,
} from "./helpers";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  ChooseProperties,
  TypePreviewColumn,
  SaveButton,
} from "./styled";

export const TypeEditorComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;

  useEffect(() => {
    dispatch(getInitialData());
    dispatch(setModulesVisibility(false, true));
    dispatch(getBlobData());
  }, [dispatch]);

  const onCloseEditor = () => {
    dispatch(closeTypeEditor());
  };

  const onChange = (key: string, value: any) => {
    dispatch(updateValue(key, value));
  };

  const onSave = () => {
    dispatch(saveLibraryType(state.createLibraryType));
    dispatch(closeTypeEditor());
  };

  const onTerminalCategoryChange = (
    key: string,
    value: TerminalTypeItem,
    categoryId: string,
    row: number
  ) => {
    if (key === "add") {
      dispatch(addTerminalType(value));
    } else if (key === "remove") {
      dispatch(removeTerminalType(value));
    } else if (key === "update") {
      dispatch(updateTerminalType(value));
    }
  };

  return (
    <>
      {state.visible && (
        <TypeEditorWrapper>
          <TypeEditorContent>
            <TypeEditorHeader>
              <p>{TextResources.TypeEditor}</p>
              <img src={CloseIcon} alt="close-window" onClick={onCloseEditor} />
            </TypeEditorHeader>

            <TypeEditorInputs
              onChange={(key, value) => onChange(key, value)}
              createLibraryType={state?.createLibraryType}
              icons={state?.icons}
              locationTypes={state?.locationTypes}
            />
            <ChooseProperties>
              <TypeEditorList
                items={state?.rdsList}
                createLibraryType={state?.createLibraryType}
                listType={ListType.Rds}
                onChange={(key, data) => onChange(key, data)}
                // disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
              />
              {IsFunction(state?.createLibraryType.aspect) && (
                <TypeEditorList
                  items={state?.terminals}
                  createLibraryType={state?.createLibraryType}
                  listType={ListType.Terminals}
                  onChange={
                    IsObjectBlock(state?.createLibraryType.objectType)
                      ? (key, data, categoryId, row) =>
                          onTerminalCategoryChange(key, data, categoryId, row)
                      : (key, data) => onChange(key, data)
                  }
                  // disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
                />
              )}
              {IsLocation(state?.createLibraryType.aspect) && (
                <TypeEditorList
                  items={state?.predefinedAttributes}
                  createLibraryType={state?.createLibraryType}
                  listType={ListType.PredefinedAttributes}
                  onChange={(key, data) => onChange(key, data)}
                  // disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
                />
              )}
              {!IsInterface(state.createLibraryType.objectType) && (
                <TypeEditorList
                  items={state?.attributes}
                  createLibraryType={state?.createLibraryType}
                  listType={
                    IsLocation(state?.createLibraryType.aspect)
                      ? ListType.LocationAttributes
                      : ListType.ObjectAttributes
                  }
                  onChange={(key, data) => onChange(key, data)}
                />
              )}
              <TypePreviewColumn>
                <TypePreview
                  createLibraryType={state?.createLibraryType}
                  rds={GetSelectedRds(state?.createLibraryType, state.rdsList)}
                  terminal={GetSelectedTerminal(
                    state?.createLibraryType,
                    state.terminals
                  )}
                  // onChange={onCloseEditor}
                  // disabled={FieldValidator(state, "add")}
                />
                <SaveButton onClick={onSave}>
                  <p>
                    {state.createLibraryType.libraryId === null
                      ? TextResources.TypeEditor_Button_Add
                      : TextResources.TypeEditor_Button_Edit}
                  </p>
                  <img
                    src={
                      state.createLibraryType.libraryId === null
                        ? AddIcon
                        : CheckIcon
                    }
                    alt="icon"
                    className="icon"
                  />
                </SaveButton>
              </TypePreviewColumn>
            </ChooseProperties>
            {/* <TypeEditorInspector /> */}
          </TypeEditorContent>
        </TypeEditorWrapper>
      )}
    </>
  );
};

export default TypeEditorComponent;
