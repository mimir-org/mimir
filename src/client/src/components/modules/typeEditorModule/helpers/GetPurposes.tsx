import { DropDownItem } from "../../../../compLibrary/dropdown/Dropdown";
import { Purpose } from "../../../../models";

const GetPurposes = (purposes: Purpose[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ name: "Purposes", items: [] } as DropDownItem);
  purposes.forEach((purpose) => {
    categories[0].items.push(purpose);
  });
  return categories;
};

export default GetPurposes;
