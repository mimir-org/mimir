import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { BlobData } from "../../../../models";
import { CreateId } from "../../../flow/helpers";

const GetBlobData = (blobs: BlobData[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ id: CreateId(), name: "Blobs", description: "Symbol", image: null, items: [] });
  blobs.forEach((blob) => {
    categories[0].items.push({
      id: blob.id,
      description: blob.name,
      name: blob.name,
      image: blob.data,
      items: [],
    });
  });

  return categories;
};

export default GetBlobData;
