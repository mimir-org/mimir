import { DropDownItem } from "../../../../compLibrary/dropdown/Dropdown";
import { ObjectType } from "../../../../models";

const stringIsNumber = (value) => isNaN(Number(value)) === false;

const GetObjectTypes = (): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ name: "ObjectType", items: [] } as DropDownItem);

  Object.keys(ObjectType)
    .filter(stringIsNumber)
    .forEach((item) => {
      categories[0].items.push({
        id: item,
        name: ObjectType[item],
      });
    });

  return categories;
};

export default GetObjectTypes;
