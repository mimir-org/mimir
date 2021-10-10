import { GetObjectTypeDescription } from ".";
import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { Aspect, ObjectType } from "../../../../models";
import { CreateId } from "../../../flow/helpers";

const stringIsNumber = (value) => isNaN(Number(value)) === false;

const GetObjectTypes = (aspect: Aspect): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ id: CreateId(), name: "ObjectType", description: "Object Type", image: null, items: [] });

  Object.keys(ObjectType)
    .filter(stringIsNumber)
    .forEach((item) => {
      categories[0].items.push({
        id: item,
        name: ObjectType[item],
        description: GetObjectTypeDescription(aspect, Number(item)),
        image: null,
        items: [],
      });
    });

  return categories;
};

export default GetObjectTypes;
