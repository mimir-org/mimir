import { useEffect, useRef } from "react";
import { typeEditorStateSelector, useAppDispatch, useAppSelector } from "../redux/store";
import { fetchingBlobData, fetchingInitialData, fetchingSimpleTypes } from "./redux/typeEditorSlice";
import { CloseIcon } from "../assets/icons/close";
import { CheckIcon } from "../assets/icons/checkmark";
import { LibraryIcon } from "../assets/icons/modules";
import { TextResources } from "../assets/text";
import { Button } from "../compLibrary/buttons";
import { GetInputTerminals, GetOutputTerminals } from "./preview/helpers";
import { TypeEditorInputs, TypePreview } from "./";
import { OnCloseEditor, OnPropertyChange, OnSave } from "./handlers";
import { GetSelectedIcon, GetSelectedRds, GetSelectedTerminal, GetTypeEditorLists, GetPropertiesHeight } from "./helpers";
import {
  ButtonsContainer,
  ChooseProperties,
  TypeEditorContent,
  TypeEditorHeader,
  TypeEditorWrapper,
  TypePreviewColumn,
} from "./styled";

/**
 * Component for adding or editing a type
 * @returns the visual Type Editor window
 */
export const TypeEditorComponent = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(typeEditorStateSelector);
  const typeEditorPropertiesRef = useRef(null);
  const createMode = state.createLibraryType.id === null;

  useEffect(() => {
    dispatch(fetchingInitialData());
    dispatch(fetchingSimpleTypes());
    dispatch(fetchingBlobData());
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
              <ButtonsContainer>
                <Button
                  onClick={() => OnSave(dispatch, state.createLibraryType)}
                  text={createMode ? TextResources.TypeEditor_Button_Add : TextResources.TypeEditor_Button_Edit}
                  icon={createMode ? LibraryIcon : CheckIcon}
                />
                <Button
                  onClick={() => OnCloseEditor(dispatch)}
                  text={createMode ? TextResources.TypeEditor_Button_Cancel_Add : TextResources.TypeEditor_Button_Cancel_Edit}
                />
              </ButtonsContainer>
            </TypePreviewColumn>
          </ChooseProperties>

          {/* <TypeEditorInspectorWrapper>
            {!!state.createLibraryType.aspect && (
              <TypeEditorInspector
                createLibraryType={state.createLibraryType}
                typeEditorPropertiesRef={typeEditorPropertiesRef}
              />
            )}
          </TypeEditorInspectorWrapper> */}
        </TypeEditorContent>
      </TypeEditorWrapper>
    )
  );
};

export default TypeEditorComponent;
