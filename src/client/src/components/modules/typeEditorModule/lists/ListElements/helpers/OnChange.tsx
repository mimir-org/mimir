import { PredefinedAttribute, TypeMode } from "../../../../../../models";
import { choosePredefinedAttributes } from "../../../../../../redux/store/typeEditor/actions";

const OnChange = (
  mode: TypeMode,
  locationAttribute: PredefinedAttribute,
  locationAttributes: PredefinedAttribute[],
  isSelected: boolean,
  dispatch
) => {
  let temp: PredefinedAttribute[];
  if (locationAttribute) {
    if (isSelected) {
      temp = locationAttributes.filter((a) => a.key !== locationAttribute.key);
      dispatch(choosePredefinedAttributes(mode, temp));
    } else {
      locationAttributes.push(locationAttribute);
      dispatch(choosePredefinedAttributes(mode, locationAttributes));
    }
  }
};

export default OnChange;
