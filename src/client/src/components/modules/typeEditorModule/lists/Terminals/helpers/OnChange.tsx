import { PredefinedAttribute } from "../../../../../../models";
import { updatePredefinedAttributes } from "../../../../../../redux/store/typeEditor/actions";

const OnChange = (
  locationAttribute: PredefinedAttribute,
  locationAttributes: PredefinedAttribute[],
  isSelected: boolean,
  dispatch
) => {
  let temp: PredefinedAttribute[];
  if (locationAttribute) {
    if (isSelected) {
      temp = locationAttributes.filter((a) => a.key !== locationAttribute.key);
      dispatch(updatePredefinedAttributes(temp));
    } else {
      locationAttributes.push(locationAttribute);
      dispatch(updatePredefinedAttributes(locationAttributes));
    }
  }
};

export default OnChange;
