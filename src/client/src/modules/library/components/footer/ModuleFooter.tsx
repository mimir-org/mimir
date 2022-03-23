import { useState } from "react";
import { Dispatch } from "redux";
import { TextResources } from "../../../../assets/text";
import { OnOpenTypeEditor } from "../../../../typeEditor/handlers";
import { LibFooter } from "./ModuleFooter.styled";
import { ConfirmDeleteType } from "./components/confirmDelete/ConfirmDeleteType";
import { ManageSelectedTypes } from "./components/manageSelected/ManageSelectedTypes";
import { onDeleteTypeClick } from "./components/confirmDelete/handlers/OnDeleteTypeClick";
import { GetCollectionIcon, SetCollectionButtonText } from "./helpers/";
import { Button, ButtonVariant } from "../../../../compLibrary/buttons";
import { NewType, EditType, DeleteType } from "../../../../assets/icons/library";
import { Collection, CollectionsActions, LibItem, LibraryTab } from "../../../../models";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
  selectedElement: LibItem | null;
  resetSelectedElement: () => void;
  selectedTypes: LibItem[];
  setSelectedTypes: (types: LibItem[]) => void;
  collections: Collection[];
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
  resetSelectedElement,
  selectedTypes,
  setSelectedTypes,
  collections,
  dispatch,
}: Props) => {
  const [confirmDeleteBoxVisible, setConfirmDeleteBoxVisible] = useState(false);
  const [addSelectedToCollectionVisible, setAddSelectedToCollectionVisible] = useState(false);
  const isShowCollectionButtonVisible = collectionState === CollectionsActions.ManageType;

  return (
    <LibFooter libOpen={libOpen}>
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement?.id, selectedElement?.libraryType, resetSelectedElement, dispatch)}
        text={TextResources.Library_New_Type}
        icon={NewType}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => OnOpenTypeEditor(selectedElement?.id, selectedElement?.libraryType, resetSelectedElement, dispatch)}
        text={TextResources.Library_Edit_Type}
        icon={EditType}
        disabled={selectedElement === null}
      />
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => setConfirmDeleteBoxVisible(true)}
        text={TextResources.Library_Delete_Type}
        icon={DeleteType}
        disabled={selectedElement === null}
      />
      {isShowCollectionButtonVisible && (
        <Button
          variant={ButtonVariant.WhiteButton}
          onClick={() => setAddSelectedToCollectionVisible(true)}
          text={SetCollectionButtonText(collectionState)}
          icon={GetCollectionIcon(collectionState, activeTab)}
        />
      )}
      {confirmDeleteBoxVisible && (
        <ConfirmDeleteType
          isOpen={confirmDeleteBoxVisible}
          onExit={() => setConfirmDeleteBoxVisible(false)}
          onDelete={() =>
            onDeleteTypeClick(selectedElement.id, dispatch, () => {
              setConfirmDeleteBoxVisible(false);
              resetSelectedElement();
            })
          }
          deleteTargetName={selectedElement.name}
          dispatch={dispatch}
        />
      )}
      {addSelectedToCollectionVisible && (
        <ManageSelectedTypes
          isOpen={addSelectedToCollectionVisible}
          onExit={() => setAddSelectedToCollectionVisible(false)}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collections={collections}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          setAddSelectedToCollection={setAddSelectedToCollectionVisible}
          dispatch={dispatch}
        />
      )}
    </LibFooter>
  );
};
