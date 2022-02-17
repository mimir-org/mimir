import { useState } from "react";
import { Dispatch } from "redux";
import { ConfirmDeleteType, ManageSelectedTypes } from "./../library/modalContents";
import { TextResources } from "../../assets/text";
import { Button, ButtonVariant } from "../../compLibrary/buttons";
import { OnOpenTypeEditor } from "../../typeEditor/handlers";
import { Collection, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../models";
import { NewType, EditType, DeleteType } from "../../assets/icons/library";
import { LibFooter } from "./styled";
import { GetCollectionIcon } from "./tabs/Collections/helpers";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  selectedElement: string;
  selectedElementType: ObjectType;
  selectedTypes: LibItem[];
  setSelectedTypes: (types: LibItem[]) => void;
  collections: Collection[];
  onChange: () => void;
  dispatch: Dispatch;
}

/**
 * Footer component for Mimir's type library, templates and sub-projects
 * @param interface
 * @returns a footer with buttons based on activeTab
 */

const ModuleFooter = ({
  libOpen,
  activeTab,
  collectionState,
  setCollectionState,
  selectedElement,
  selectedElementType,
  selectedTypes,
  setSelectedTypes,
  collections,
  onChange,
  dispatch,
}: Props) => {
  const [confirmDeleteBox, setConfirmDeleteBox] = useState(false);
  const [addSelectedToCollection, setAddSelectedToCollection] = useState(false);
  const setCollectionsButtonText = (): string => {
    if (collectionState === CollectionsActions.ManageType) return TextResources.Library_Manage_Collections_Button_Add;
    else return TextResources.Library_Manage_Collections_Button_Manage;
  };
  const showCollectionButton = collectionState === CollectionsActions.ManageType;

  return (
    <LibFooter libOpen={libOpen}>
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
        text={TextResources.Library_New_Type}
        icon={NewType}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
        text={TextResources.Library_Edit_Type}
        icon={EditType}
        disabled={selectedElement === ""}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => setConfirmDeleteBox(true)}
        text={TextResources.Library_Delete_Type}
        icon={DeleteType}
        disabled={selectedElement === ""}
      />
      {showCollectionButton && (
        <Button
          variant={ButtonVariant.WhiteButton}
          onClick={() => setAddSelectedToCollection(true)}
          text={setCollectionsButtonText()}
          icon={GetCollectionIcon(collectionState, activeTab)}
        />
      )}
      {confirmDeleteBox && (
        <ConfirmDeleteType
          isOpen={confirmDeleteBox}
          onExit={setConfirmDeleteBox}
          selectedElement={selectedElement}
          dispatch={dispatch}
        />
      )}
      {addSelectedToCollection && (
        <ManageSelectedTypes
          isOpen={addSelectedToCollection}
          onExit={setAddSelectedToCollection}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collections={collections}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          setAddSelectedToCollection={setAddSelectedToCollection}
          dispatch={dispatch}
        />
      )}
    </LibFooter>
  );
};

export default ModuleFooter;
