import { VisualFilterData } from "../application/VisualFilter";

export const isHidden = (filter: VisualFilterData, category: string, item: string): boolean => {
  if (category == null) return false;

  const cat = filter.filters?.find((x) => x.id === category);

  if (filter == null && !cat.checked) {
    return true;
  }

  if (cat != null) {
    const it = cat.items?.find((x) => x.id == item);
    if (it != null && it.checked) return false;
    if (!cat.checked) return true;
  }
  return false;
};
