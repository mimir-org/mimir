import { DropDownCategoryItem } from "../../compLibrary/dropdown/typeEditor/Dropdown";
import { Purpose } from "../../models";
import { CreateId } from "../../components/flow/helpers";

const GetPurposes = (purposes: Purpose[]): DropDownCategoryItem<Purpose>[] => {
  const categories = [] as DropDownCategoryItem<Purpose>[];
  categories.push({ id: CreateId(), name: "Purposes", description: "Purpose", image: null, items: [] });

  purposes.forEach((purpose) => {
    categories[0].items.push({
      id: purpose.name,
      name: purpose.name,
      description: purpose.name,
      image: null,
      value: purpose,
    });
  });
  return categories;
};

export default GetPurposes;
