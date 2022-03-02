import { Dispatch } from "redux";
import { CreateId } from "../../../../../../../components/flow/helpers";
import { Collection, LibItem } from "../../../../../../../models";
import { addCollection } from "../../../../../../../redux/store/library/librarySlice";

const OnCreateCollection = (collectionName: string, selectedTypes: LibItem[], dispatch: Dispatch) => {
  const collection: Collection = {
    id: CreateId(),
    name: collectionName,
    libItems: selectedTypes,
    created: new Date(),
  };
  dispatch(addCollection(collection));
};
export default OnCreateCollection;
