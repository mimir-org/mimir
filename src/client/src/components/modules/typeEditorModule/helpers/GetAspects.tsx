import { DropDownItem } from "../../../../compLibrary/dropdown/Dropdown";
import { Aspect } from "../../../../models";

const stringIsNumber = (value) => isNaN(Number(value)) === false;

const GetAspects = (): DropDownItem[] => {
  const categories = [] as DropDownItem[];
  categories.push({ name: "Aspect", items: [] } as DropDownItem);

  Object.keys(Aspect)
    .filter(stringIsNumber)
    .forEach((item) => {
      categories[0].items.push({
        id: item,
        name: Aspect[item],
      });
    });

  //   categories[0].items = categories[0].items.filter(
  //     (x) => x.name === "Function" || x.name === "Location" || x.name === "NotSet"
  //   );

  return categories;
};

export default GetAspects;
