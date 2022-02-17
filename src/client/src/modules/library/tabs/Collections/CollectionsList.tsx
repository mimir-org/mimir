import { CollectionsListWrapper } from "./styled";
import { librarySelector, useAppSelector } from "../../../../redux/store";
import { CollectionComponent } from ".";

const CollectionsList = () => {
  const libState = useAppSelector(librarySelector);

  return (
    <CollectionsListWrapper>
      {libState.collections?.map((c) => {
        return <CollectionComponent key={c.id} collection={c} />;
      })}
    </CollectionsListWrapper>
  );
};

export default CollectionsList;
