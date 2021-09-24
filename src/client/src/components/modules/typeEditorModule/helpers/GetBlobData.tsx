import { DropDownItem } from "../../../../compLibrary/dropdown/Dropdown";
import { BlobData } from "../../../../models";

const GetBlobData = (blobs: BlobData[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ name: "Blobs", items: [] } as DropDownItem);
  blobs.forEach((blob) => {
    categories[0].items.push(blob);
  });

  return categories;
};

export default GetBlobData;
