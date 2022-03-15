import { Dispatch } from "redux";
import { CreateId } from "../../../../../../../components/flow/helpers";
import { Collection } from "../../../../../../../models";
import { addCollection } from "../../../../../../../redux/store/library/librarySlice";

const OnCreateCollection = (collectionName: string, dispatch: Dispatch) => {
  const collection: Collection = {
    id: CreateId(),
    name: collectionName,
    libItems: [],
    created: new Date(),
  };
  dispatch(addCollection(collection));
};
export default OnCreateCollection;
