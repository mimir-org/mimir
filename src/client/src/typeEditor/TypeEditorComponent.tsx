import { useEffect, useRef } from "react";
import { typeEditorStateSelector, useAppDispatch, useAppSelector } from "../redux/store";
import { ListType } from "./TypeEditorList";
import { CloseIcon } from "../assets/icons/close";
import { CheckIcon } from "../assets/icons/checkmark";
import { LibraryIcon } from "../assets/icons/modules";
import { TextResources } from "../assets/text";
import { GetInputTerminals, GetOutputTerminals } from "./preview/helpers";
import { TypeEditorList, TypeEditorInputs, TypePreview, TypeEditorInspector } from "./";
import { OnCloseEditor, OnPropertyChange, OnSave, OnTerminalCategoryChange } from "./handlers";
import { getInitialData, getBlobData } from "./redux/actions";
import { GetSelectedIcon, GetSelectedRds, GetSelectedTerminal, IsLocation, IsProduct, GetWidth } from "./helpers";
import {
  TypeEditorWrapper,
  TypeEditorContent,
  TypeEditorHeader,
  ChooseProperties,
  TypePreviewColumn,
  SaveButton,
  TypeEditorInspectorWrapper,
} from "./styled";
import { GetPropertiesHeight } from "./helpers/GetPropertiesHeight";

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
          />
          <ChooseProperties ref={typeEditorPropertiesRef} height={GetPropertiesHeight(true)}>
            <TypeEditorList
              items={state?.rdsList}
              createLibraryType={state?.createLibraryType}
              listType={ListType.Rds}
              onPropertyChange={(key, data) => OnPropertyChange(key, data, dispatch)}
            />
            {!IsLocation(state?.createLibraryType.aspect) && (
              <TypeEditorList
                items={state?.terminals}
                createLibraryType={state?.createLibraryType}
                listType={ListType.Terminals}
                onPropertyChange={(key, data) => OnPropertyChange(key, data, dispatch)}
                onTerminalCategoryChange={(key, data) => OnTerminalCategoryChange(key, data, dispatch)}
              />
            )}
            {IsLocation(state?.createLibraryType.aspect) && (
              <TypeEditorList
                items={state?.predefinedAttributes}
                createLibraryType={state?.createLibraryType}
                listType={ListType.PredefinedAttributes}
                onPropertyChange={(key, data) => OnPropertyChange(key, data, dispatch)}
              />
            )}
            <TypeEditorList
              createLibraryType={state?.createLibraryType}
              items={state?.attributes}
              listType={IsLocation(state?.createLibraryType.aspect) ? ListType.LocationAttributes : ListType.ObjectAttributes}
              onPropertyChange={(key, data) => OnPropertyChange(key, data, dispatch)}
            />
            {IsProduct(state?.createLibraryType.aspect) && (
              <TypeEditorList
                items={state?.simpleTypes}
                createLibraryType={state?.createLibraryType}
                listType={ListType.SimpleTypes}
                onPropertyChange={(key, data) => OnPropertyChange(key, data, dispatch)}
              />
            )}
            <TypePreviewColumn wide={GetWidth(ListType.Preview)}>
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
