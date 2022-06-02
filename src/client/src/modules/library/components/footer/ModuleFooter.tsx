import { useState } from "react";
import { Dispatch } from "redux";
import { TextResources } from "../../../../assets/text/TextResources";
import { LibFooter } from "./ModuleFooter.styled";
import { ConfirmDeleteType } from "./components/confirmDelete/ConfirmDeleteType";
import { ManageSelectedTypes } from "./components/manageSelected/ManageSelectedTypes";
import { onDeleteTypeClick } from "./components/confirmDelete/handlers/OnDeleteTypeClick";
import { GetCollectionIcon, SetCollectionButtonText } from "./helpers/";
import { Button, ButtonVariant } from "../../../../compLibrary/buttons";
import { DeleteType } from "../../../../assets/icons/library";
import { Collection, CollectionsActions, LibraryTab } from "../../../../models";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedElement: NodeLibCm | null;
  selectedTypes: NodeLibCm[];
  collections: Collection[];
  resetSelectedElement: () => void;
  setCollectionState: (action: CollectionsActions) => void;
  setSelectedTypes: (types: NodeLibCm[]) => void;
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
  selectedElement,
  selectedTypes,
  collections,
  resetSelectedElement,
  setCollectionState,
  setSelectedTypes,
  dispatch,
}: Props) => {
  const [confirmDeleteBoxVisible, setConfirmDeleteBoxVisible] = useState(false);
  const [addSelectedToCollectionVisible, setAddSelectedToCollectionVisible] = useState(false);
  const isShowCollectionButtonVisible = collectionState === CollectionsActions.ManageType;

  return (
    <LibFooter libOpen={libOpen}>
      <Button
        variant={ButtonVariant.WhiteButton}
        onClick={() => setConfirmDeleteBoxVisible(true)}
        text={TextResources.DELETE_TYPE}
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
          deleteTargetName={selectedElement?.name}
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
