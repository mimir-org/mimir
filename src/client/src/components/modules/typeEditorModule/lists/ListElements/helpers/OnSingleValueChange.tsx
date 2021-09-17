import { PredefinedAttribute } from "../../../../../../models";

const OnSingleValueChange = (
  e,
  name: string,
  attributes: PredefinedAttribute[],
  isMultiSelect: boolean,
  onChange: Function
) => {
  const targetKey = e.target.value;
  let attribute = attributes.find((a) => a.key === name);

  let valueslist = attribute.values;
  if (valueslist) valueslist[targetKey] = !valueslist[targetKey];

  const entries = Object.entries(valueslist).filter(
    ([key, _value]) => key !== targetKey
  );
  entries.forEach(([key, value]) => {
    if (value) valueslist[key] = false;
    return [key, value];
  });

  attribute = {
    key: name,
    values: valueslist,
    isMultiSelect: isMultiSelect,
  };

  let attributesList = attributes;
  attributesList = attributesList.map((a) => {
    if (a.key === attribute.key) a = attribute;
    return a;
  });
  onChange("predefinedAttributes", attributesList);
};

export default OnSingleValueChange;
