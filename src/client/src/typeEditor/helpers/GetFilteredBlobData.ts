import { DropDownCategoryItem } from "../../compLibrary/dropdown/typeEditor/Dropdown";
import { BlobData } from "../../models";
import { CreateId } from "../../components/flow/helpers";

const GetFilteredBlobData = (blobs: BlobData[]): DropDownCategoryItem<BlobData>[] => {
  const categories = [] as DropDownCategoryItem<BlobData>[];
  categories.push({ id: CreateId(), name: "Blobs", description: "Symbol", image: null, items: [] });

  blobs.forEach((blob) => {
    categories[0].items.push({
      id: blob.data,
      description: blob.name,
      name: blob.name,
      image: blob.data,
      value: blob,
    });
  });

  return categories;
};

export default GetFilteredBlobData;
