import { NodeLibCm } from "@mimirorg/typelibrary-types";

const OnCheckboxChange = (
  item: NodeLibCm,
  selectedTypes: NodeLibCm[],
  setSelectedTypes: (array: NodeLibCm[]) => void,
  selected: boolean
) => {
  let temp: NodeLibCm[] = [...selectedTypes];
  if (selected) temp = temp.filter((a) => a !== item);
  else if (!selected && temp) temp.push(item);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
