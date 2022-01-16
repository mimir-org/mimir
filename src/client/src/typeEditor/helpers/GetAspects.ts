/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropDownCategoryItem } from "../../compLibrary/dropdown/typeEditor/Dropdown";
import { Aspect } from "../../models";
import { CreateId } from "../../components/flow/helpers";
import { AspectKey } from "../types";

const stringIsNumber = (value: any) => isNaN(Number(value)) === false;

const GetAspects = (): DropDownCategoryItem<AspectKey>[] => {
  const categories = [] as DropDownCategoryItem<AspectKey>[];
  categories.push({ id: CreateId(), name: "Aspect", description: "Aspect", image: null, items: [] });

  Object.keys(Aspect)
    .filter(stringIsNumber)
    .forEach((item) => {
      categories[0].items.push({
        id: item,
        name: Aspect[item],
        description: Aspect[item],
        image: null,
        value: Aspect[item] as AspectKey,
      });
    });

  return categories;
};

export default GetAspects;
