import { useEffect, useRef } from "react";
import { typeEditorStateSelector, useAppDispatch, useAppSelector } from "../redux/store";
import { CloseIcon } from "../assets/icons/close";
import { CheckIcon } from "../assets/icons/checkmark";
import { LibraryIcon } from "../assets/icons/modules";
import { TextResources } from "../assets/text";
import { GetInputTerminals, GetOutputTerminals } from "./preview/helpers";
import { TypeEditorInputs, TypeEditorInspector, TypePreview } from "./";
import { OnCloseEditor, OnPropertyChange, OnSave } from "./handlers";
import { getBlobData, getInitialData } from "./redux/actions";
import { GetSelectedIcon, GetSelectedRds, GetSelectedTerminal, GetTypeEditorLists, GetPropertiesHeight } from "./helpers";
import {
  ChooseProperties,
  SaveButton,
  TypeEditorContent,
  TypeEditorHeader,
  TypeEditorInspectorWrapper,
  TypeEditorWrapper,
  TypePreviewColumn
} from "./styled";

/**
 * Component for adding or editing a type
 * @returns the visual Type Editor window
 */
export const TypeEditorComponent = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(typeEditorStateSelector);
  const typeEditorPropertiesRef = useRef(null);

  useEffect(() => {
    dispatch(getInitialData());
    dispatch(getBlobData());
  }, [dispatch]);

  return (
    state.visible && (
      <TypeEditorWrapper>
        <TypeEditorContent>
          <TypeEditorHeader>
            <p>{TextResources.TypeEditor}</p>
            <img src={CloseIcon} alt="close-window" onClick={() => OnCloseEditor(dispatch)} />
          </TypeEditorHeader>
          <TypeEditorInputs
            onChange={(key, value) => OnPropertyChange(key, value, dispatch)}
            createLibraryType={state?.createLibraryType}
            icons={state?.icons}
            locationTypes={state?.locationTypes}
            purposes={state?.purposes}
            isValidationVisible={state?.validationVisibility}
          />
          <ChooseProperties ref={typeEditorPropertiesRef} height={GetPropertiesHeight(true)}>
            {GetTypeEditorLists(state, dispatch)}
            <TypePreviewColumn flex={1.5}>
              <TypePreview
                createLibraryType={state?.createLibraryType}
                rds={GetSelectedRds(state?.createLibraryType, state.rdsList)}
                inputTerminals={
                  state?.createLibraryType.terminalTypes && GetInputTerminals(state?.createLibraryType, state?.terminals)
                }
                outputTerminals={
                  state?.createLibraryType.terminalTypes && GetOutputTerminals(state?.createLibraryType, state?.terminals)
                }
                terminal={
                  state?.createLibraryType.terminalTypeId && GetSelectedTerminal(state?.createLibraryType, state?.terminals)
                }
                symbol={GetSelectedIcon(state?.createLibraryType, state?.icons)}
              />
              <SaveButton onClick={() => OnSave(dispatch, state.createLibraryType)}>
                <p>
                  {state.createLibraryType.id === null
                    ? TextResources.TypeEditor_Button_Add
                    : TextResources.TypeEditor_Button_Edit}
                </p>
                <img src={state.createLibraryType.id === null ? LibraryIcon : CheckIcon} alt="icon" className="icon" />
              </SaveButton>
            </TypePreviewColumn>
          </ChooseProperties>

          <TypeEditorInspectorWrapper>
            {!!state.createLibraryType.aspect && (
              <TypeEditorInspector
                createLibraryType={state.createLibraryType}
                typeEditorPropertiesRef={typeEditorPropertiesRef}
              />
            )}
          </TypeEditorInspectorWrapper>
        </TypeEditorContent>
      </TypeEditorWrapper>
    )
  );
};

export default TypeEditorComponent;
