import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TypeEditorState } from "../redux/store/typeEditor/types";
import { ListType } from "./TypeEditorList";
import { CloseIcon } from "../assets/icons/close";
import { CheckIcon } from "../assets/icons/checkmark";
import { TextResources } from "../assets/text";
import { GetInputTerminals, GetOutputTerminals } from "./preview/helpers";
import { TypeEditorList, TypeEditorInputs, TypePreview, TypeEditorInspector } from "./";
import { LibraryIcon } from "../assets/icons/modules";
import {
  GetSelectedRds,
  GetSelectedTerminal,
  IsLocation,
  IsInterface,
  IsObjectBlock,
  IsProduct,
  GetWidth,
} from "./helpers";
import {
  closeTypeEditor,
  getInitialData,
  getBlobData,
  updateValue,
  addTerminalType,
  removeTerminalType,
  updateTerminalType,
  removeTerminalTypeByCategory,
  saveLibraryType,
} from "../redux/store/typeEditor/actions";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  ChooseProperties,
  TypePreviewColumn,
  SaveButton,
} from "./styled";
/**
 * Component for adding or editing a type
 * @returns the visual Type Editor window
 */
export const TypeEditorComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;

  useEffect(() => {
    dispatch(getInitialData());
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

  const onTerminalCategoryChange = (key: string, value: any) => {
    if (key === "add") {
      dispatch(addTerminalType(value));
    } else if (key === "remove") {
      dispatch(removeTerminalType(value));
    } else if (key === "update") {
      dispatch(updateTerminalType(value));
    } else if (key === "removeAll") {
      dispatch(removeTerminalTypeByCategory(value));
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
              purposes={state?.purposes}
            />
            <ChooseProperties>
              <TypeEditorList
                items={state?.rdsList}
                createLibraryType={state?.createLibraryType}
                listType={ListType.Rds}
                onChange={(key, data) => onChange(key, data)}
                // disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
              />
              {!IsLocation(state?.createLibraryType.aspect) && (
                <TypeEditorList
                  items={state?.terminals}
                  createLibraryType={state?.createLibraryType}
                  listType={ListType.Terminals}
                  onChange={
                    IsObjectBlock(state?.createLibraryType.objectType)
                      ? (key, data) => onTerminalCategoryChange(key, data)
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
                    IsLocation(state?.createLibraryType.aspect) ? ListType.LocationAttributes : ListType.ObjectAttributes
                  }
                  onChange={(key, data) => onChange(key, data)}
                />
              )}
              {IsProduct(state?.createLibraryType.aspect) && (
                <TypeEditorList
                  items={state?.simpleTypes}
                  createLibraryType={state?.createLibraryType}
                  listType={ListType.SimpleTypes}
                  onChange={(key, data) => onChange(key, data)}
                  // disabled={ModeEdit(mode) ? false : FieldValidator(state, "rds")}
                />
              )}
              <TypePreviewColumn wide={GetWidth(ListType.Preview)}>
                <TypePreview
                  createLibraryType={state?.createLibraryType}
                  rds={GetSelectedRds(state?.createLibraryType, state.rdsList)}
                  inputTerminals={
                    state?.createLibraryType.terminalTypes &&
                    GetInputTerminals(state?.createLibraryType, state?.terminals)
                  }
                  outputTerminals={
                    state?.createLibraryType.terminalTypes &&
                    GetOutputTerminals(state?.createLibraryType, state?.terminals)
                  }
                  terminal={
                    state?.createLibraryType.terminalTypeId &&
                    GetSelectedTerminal(state?.createLibraryType, state?.terminals)
                  }
                  // disabled={FieldValidator(state, "add")}
                />
                <SaveButton onClick={onSave}>
                  <p>
                    {state.createLibraryType.libraryId === null
                      ? TextResources.TypeEditor_Button_Add
                      : TextResources.TypeEditor_Button_Edit}
                  </p>
                  <img
                    src={state.createLibraryType.libraryId === null ? LibraryIcon : CheckIcon}
                    alt="icon"
                    className="icon"
                  />
                </SaveButton>
              </TypePreviewColumn>
            </ChooseProperties>
            <TypeEditorInspector />
          </TypeEditorContent>
        </TypeEditorWrapper>
      )}
    </>
  );
};

export default TypeEditorComponent;
