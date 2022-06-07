/* eslint-disable @typescript-eslint/no-explicit-any */

import { TerminalType, TerminalTypeDict } from "../../../../../../../models";

export type TerminalCategory = {
  id: string;
  name: string;
  items: TerminalType[];
};

// TODO: TypeEditor fix

export const GetFilteredTerminalsList = (terminals: TerminalTypeDict): TerminalCategory[] => {
  const categories = [];
  if (!terminals || terminals.length <= 0) return [] as any[];

  terminals.forEach((terminalCategory) => {
    const cat = {
      name: terminalCategory.key,
      id: terminalCategory?.value[0].terminalCategoryId,
      items: [],
    } as TerminalCategory;

    terminalCategory?.value.forEach((element) => {
      cat.items.push({
        id: element.id,
        name: element.name,
        color: element.color,
        terminalCategoryId: element.terminalCategoryId,
        terminalCategory: element.terminalCategory,
        semanticReference: element.semanticReference,
      } as TerminalType);
    });
    categories.push(cat);
  });
  return categories;
};
