import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";

const OnCheckboxChange = (
  item: AspectObjectLibCm,
  selectedTypes: AspectObjectLibCm[],
  setSelectedTypes: (array: AspectObjectLibCm[]) => void,
  selected: boolean
) => {
  let temp: AspectObjectLibCm[] = [...selectedTypes];
  if (selected) temp = temp.filter((a) => a !== item);
  else if (!selected && temp) temp.push(item);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
