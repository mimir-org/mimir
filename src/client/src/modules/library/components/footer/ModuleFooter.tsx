import { useState } from "react";
import { Dispatch } from "redux";
import { LibFooter } from "./ModuleFooter.styled";
import { ManageSelectedTypes } from "./components/manageSelected/ManageSelectedTypes";
import { GetCollectionIcon, SetCollectionButtonText } from "./helpers/";
import { Button, ButtonVariant } from "../../../../compLibrary/buttons";
import { Collection, CollectionsActions, LibraryTab } from "../../../../models";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  selectedTypes: NodeLibCm[];
  collections: Collection[];
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
  selectedTypes,
  collections,
  setCollectionState,
  setSelectedTypes,
  dispatch,
}: Props) => {
  const [addSelectedToCollectionVisible, setAddSelectedToCollectionVisible] = useState(false);
  const isShowCollectionButtonVisible = collectionState === CollectionsActions.ManageType;

  return (
    <LibFooter libOpen={libOpen}>
      {isShowCollectionButtonVisible && (
        <Button
          variant={ButtonVariant.WhiteButton}
          onClick={() => setAddSelectedToCollectionVisible(true)}
          text={SetCollectionButtonText(collectionState)}
          icon={GetCollectionIcon(collectionState, activeTab)}
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
