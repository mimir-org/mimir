import { DropDownItem } from "../../../../compLibrary/dropdown/Dropdown";
import { LocationType } from "../../../../models";

const GetLocationTypes = (locations: LocationType[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  if (!locations || locations.length <= 0) return categories;

  locations.forEach((category) => {
    const cat = { name: category.name, items: [] } as DropDownItem;
    category?.locationSubTypes.forEach((element, index) => {
      cat.items.push({
        id: element.id,
        name: element.name,
      });
    });
    categories.push(cat);
  });

  return categories;
};

export default GetLocationTypes;
