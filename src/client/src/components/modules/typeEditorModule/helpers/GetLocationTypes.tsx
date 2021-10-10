import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { LocationType } from "../../../../models";

const GetLocationTypes = (locations: LocationType[]): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  if (!locations || locations.length <= 0) return categories;

  locations.forEach((category) => {
    const cat = { id: category.id, name: category.name, description: category.name, image: null, items: [] };
    category?.locationSubTypes.forEach((element, index) => {
      cat.items.push({
        id: element.id,
        name: element.name,
        description: element.name,
        image: null,
        items: [],
      });
    });
    categories.push(cat);
  });

  return categories;
};

export default GetLocationTypes;
