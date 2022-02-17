import { Collection } from "../../../../models";

interface Props {
  collection: Collection;
}

const CollectionComponent = ({ collection }: Props) => {
  return <>{collection.name}</>;
};

export default CollectionComponent;
