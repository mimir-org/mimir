import { CollectionsListWrapper } from "./CollectionsList.styled";
import { librarySelector, useAppSelector } from "../../../../../../../../redux/store";
import { CollectionsActions } from "../../../../../../../../models";
import { CollectionComponent } from "./CollectionComponent";

interface Props {
  collectionState: CollectionsActions;
}

export const CollectionsList = ({ collectionState }: Props) => {
  const libState = useAppSelector(librarySelector);

  return (
    <CollectionsListWrapper>
      {libState.collections?.map((c) => {
        return <CollectionComponent key={c.id} collection={c} collectionState={collectionState} />;
      })}
    </CollectionsListWrapper>
  );
};
