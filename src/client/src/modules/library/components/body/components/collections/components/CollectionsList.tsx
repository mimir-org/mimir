import { CollectionsListWrapper } from "./CollectionsList.styled";
import { librarySelector, useAppSelector } from "../../../../../../../redux/store";
import { CollectionComponent } from "./CollectionComponent";

export const CollectionsList = () => {
  const libState = useAppSelector(librarySelector);

  return (
    <CollectionsListWrapper>
      {libState.collections?.map((c) => {
        return <CollectionComponent key={c.id} collection={c} />;
      })}
    </CollectionsListWrapper>
  );
};
