import { Collection } from ".";
import { CollectionsActions, LibraryTab } from "../../../../models";
import { CollectionsListWrapper } from "./styled";
import data from "../Collections/Collections.json";

interface Props {
  collectionState: CollectionsActions;
  activeTab: LibraryTab;
  selectedCollections: string[];
  onChange: (action: string, id: string) => void;
}

const CollectionsList = ({ collectionState, selectedCollections, activeTab, onChange }: Props) => {
  const isChecked = (id: string) => {
    return selectedCollections.includes(id);
  };
  const collections =
    collectionState === CollectionsActions.ReadOnly ? data.collections.filter((x) => isChecked(x.id) === true) : data.collections;

  return (
    <CollectionsListWrapper>
      {console.log("selectedCollections", selectedCollections)}
      {collections.map((collection) => (
        <Collection
          key={collection.id}
          id={collection.id}
          name={collection.name}
          checked={isChecked(collection.id)}
          typeCategories={collection.typeCategories}
          position={collection.position}
          collectionState={collectionState}
          activeTab={activeTab}
          onChange={onChange}
        />
      ))}
    </CollectionsListWrapper>
  );
};

export default CollectionsList;
