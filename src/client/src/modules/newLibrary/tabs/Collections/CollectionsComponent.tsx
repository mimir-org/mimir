import { TextResources } from "../../../../assets/text";
import { Button } from "../../../../compLibrary/buttons";
import { CollectionsWrapper } from "./styled";
import { useState } from "react";
import { CollectionsList } from ".";
import { CollectionsActions, LibraryTab } from "../../../../models";
import { GetCollectionIcon } from "./helpers";

interface Props {
  activeTab: LibraryTab;
  collectionState: CollectionsActions;
  setCollectionState: (action: CollectionsActions) => void;
}

const CollectionsComponent = ({ activeTab, collectionState, setCollectionState }: Props) => {
  const [selectedCollections, setSelectedCollections] = useState([]);
  const managingCollections = collectionState === CollectionsActions.Manage;
  const onChange = (action: string, collectionId: string) => {
    if (action === "add") selectedCollections.push(collectionId);
    if (action === "remove") setSelectedCollections(selectedCollections.filter((c) => c !== collectionId));
  };

  return (
    <CollectionsWrapper manageCollections={managingCollections}>
      {collectionState === CollectionsActions.NonSelectedAdmin && (
        <>
          <p>{TextResources.Library_Manage_Collections}</p>
          <Button
            onClick={() => {
              setCollectionState(CollectionsActions.Manage);
            }}
            text={TextResources.Library_Manage_Collections_Button}
            icon={GetCollectionIcon(activeTab)}
          />
        </>
      )}
      {collectionState === CollectionsActions.Manage && (
        <>
          <p>{TextResources.Library_Select_Collections}</p>
          <CollectionsList
            collectionState={collectionState}
            activeTab={activeTab}
            selectedCollections={selectedCollections}
            onChange={onChange}
          />
          <Button
            onClick={() => {
              setCollectionState(CollectionsActions.ReadOnly);
            }}
            text={TextResources.Library_Manage_Collections_Update_Library}
          />
        </>
      )}
      {collectionState === CollectionsActions.ReadOnly && (
        <CollectionsList
          collectionState={collectionState}
          activeTab={activeTab}
          selectedCollections={selectedCollections}
          onChange={onChange}
        />
      )}
    </CollectionsWrapper>
  );
};

export default CollectionsComponent;
