import { IsCreateLibraryType } from "../../helpers/IsType";
import { AttributeLikeItem, InspectorElement } from "../../types";
import { ParametersContent } from "./";
import { GetParametersElement } from "./helpers/GetParametersElement";

interface Props {
  element: InspectorElement;
  attributeLikeItems?: AttributeLikeItem[];
}

const ParametersComponent = ({ element, attributeLikeItems }: Props) => {
  const parametersElement = GetParametersElement(element);
  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;

  return (
    <ParametersContent
      parametersElement={parametersElement}
      inspectorParentElement={element}
      elementIsLocked={elementIsLocked}
      attributeLikeItems={attributeLikeItems}
    />
  );
};
export default ParametersComponent;
