import { DropDownItem } from "../../../../compLibrary/dropdown/typeEditor/Dropdown";
import { Aspect } from "../../../../models";
import { CreateId } from "../../../flow/helpers";

const stringIsNumber = (value: any) => isNaN(Number(value)) === false;

const GetAspects = (): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ id: CreateId(), name: "Aspect", description: "Aspect", image: null, items: [] });

  Object.keys(Aspect)
    .filter(stringIsNumber)
    .forEach((item) => {
      categories[0].items.push({
        id: item,
        name: Aspect[item],
        description: Aspect[item],
        image: null,
        items: [],
      });
    });

  return categories;
};

export default GetAspects;
