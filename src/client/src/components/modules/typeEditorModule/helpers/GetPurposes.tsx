import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { Purpose } from "../../../../models";
import { CreateId } from "../../../flow/helpers";

const GetPurposes = (purposes: Purpose[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ id: CreateId(), name: "Purposes", description: "Purpose", image: null, items: [] });
  purposes.forEach((purpose) => {
    categories[0].items.push({
      id: purpose.id,
      name: purpose.name,
      description: purpose.name,
      image: null,
      items: [],
    });
  });
  return categories;
};

export default GetPurposes;
