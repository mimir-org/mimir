import { TerminalType } from "../../../../models";

const GetFilteredTerminalsList = (terminals: any[]): any[] => {
  const categories = [];
  if (!terminals || terminals.length <= 0) return [] as any[];

  terminals.forEach((terminalCategory) => {
    const cat = { name: terminalCategory.key, items: [] };
    terminalCategory?.value.forEach((element, index) => {
      cat.items.push({
        id: element.id,
        name: element.name,
        color: element.color,
        terminalCategoryId: element.terminalCategoryId,
        terminalCategory: element.terminalCategory,
        semanticReference: element.semanticReferance,
      } as TerminalType);
    });
    categories.push(cat);
  });
  return categories;
};

export default GetFilteredTerminalsList;
