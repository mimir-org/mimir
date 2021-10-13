import { InspectorElement } from "../../types";
import { ParametersContent } from "./";
import { GetParametersElement } from "./helpers/GetParametersElement";

interface Props {
  element: InspectorElement;
}

const ParametersComponent = ({ element }: Props) => {
  const parametersElement = GetParametersElement(element);

  return <ParametersContent parametersElement={parametersElement} elementIsLocked={element.isLocked} />;
};
export default ParametersComponent;
