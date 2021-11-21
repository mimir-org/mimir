import { IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

const GetSimpleTypes = (element: InspectorElement) => {
  if (IsNode(element)) return element.composites;
};

export default GetSimpleTypes;
