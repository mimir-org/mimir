import { PredefinedAttribute, TypeMode } from "../../../../../../models";
import { choosePredefinedAttributes } from "../../../../../../redux/store/typeEditor/actions";

const OnMultipleValuesChange = (
  [param_key, param_value],
  name: string,
  attributes: PredefinedAttribute[],
  isMultiSelect: boolean,
  mode: TypeMode,
  dispatch
) => {
  let attribute: PredefinedAttribute = attributes.find((a) => a.key === name);
  const valueslist = attribute.values;
  if (valueslist) valueslist[param_key] = !param_value;

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
  dispatch(choosePredefinedAttributes(mode, attributesList));
};

export default OnMultipleValuesChange;
