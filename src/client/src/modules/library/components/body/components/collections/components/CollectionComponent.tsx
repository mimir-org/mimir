import { Collection } from "../../../../../../../models";

interface Props {
  collection: Collection;
}

export const CollectionComponent = ({ collection }: Props) => {
  return <>{collection.name}</>;
};
