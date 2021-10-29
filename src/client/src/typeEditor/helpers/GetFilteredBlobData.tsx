import { DropDownItem } from "../../compLibrary/dropdown/typeEditor/Dropdown";
import { BlobData } from "../../models";
import { CreateId } from "../../components/flow/helpers";

const GetFilteredBlobData = (blobs: BlobData[]): DropDownItem[] => {
  // blobs = blobs.filter((b) => discipline & b.discipline);
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

export default GetFilteredBlobData;
