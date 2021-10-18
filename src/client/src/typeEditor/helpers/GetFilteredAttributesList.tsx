import { Aspect, Discipline } from "../../models";

const GetFilteredAttributesList = (attributes: any[], aspect: Aspect, discipline: Discipline): any[] => {
  if (!attributes || attributes.length <= 0) return [] as any[];
  const attributesByAspect = attributes.filter((x) => aspect & x.aspect);
  const attributesByDiscipline = [];
  const disciplinesArray = [...new Set(attributes.map((a) => discipline & a.discipline))];
  disciplinesArray.forEach((d) => {
    const dis = { discipline: d, items: [] };
    attributesByAspect.forEach((a) => {
      if (a.discipline === d) {
        dis.items.push(a);
      }
    });
    if (dis.items.length > 0) {
      attributesByDiscipline.push(dis);
    }
  });
  return attributesByDiscipline;
};

export default GetFilteredAttributesList;