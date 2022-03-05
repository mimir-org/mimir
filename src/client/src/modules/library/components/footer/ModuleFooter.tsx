import { useState } from "react";
import { Dispatch } from "redux";
import { TextResources } from "../../../../assets/text/TextResources";
import { OnOpenTypeEditor } from "../../../../typeEditor/handlers";
import { LibFooter } from "./ModuleFooter.styled";
import { ConfirmDeleteType } from "./components/confirmDelete/ConfirmDeleteType";
import { ManageSelectedTypes } from "./components/manageSelected/ManageSelectedTypes";
import { GetCollectionIcon, SetCollectionButtonText } from "./helpers/";
import { Button, ButtonVariant } from "../../../../compLibrary/buttons";
import { NewType, EditType, DeleteType } from "../../../../assets/icons/library";
import { Collection, CollectionsActions, LibItem, LibraryTab, ObjectType } from "../../../../models";

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

export const ModuleFooter = ({
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
  const showCollectionButton = collectionState === CollectionsActions.ManageType;

  return (
    <LibFooter libOpen={libOpen}>
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
        text={TextResources.LIBRARY_NEW_TYPE}
        icon={NewType}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
        text={TextResources.LIBRARY_EDIT_TYPE}
        icon={EditType}
        disabled={selectedElement === ""}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => setConfirmDeleteBox(true)}
        text={TextResources.LIBRARY_DELETE_TYPE}
        icon={DeleteType}
        disabled={selectedElement === ""}
      />
      {showCollectionButton && (
        <Button
          variant={ButtonVariant.WhiteButton}
          onClick={() => setAddSelectedToCollection(true)}
          text={SetCollectionButtonText(collectionState)}
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
