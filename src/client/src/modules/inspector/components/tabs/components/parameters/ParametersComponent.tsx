import { AttributeLikeItem, InspectorElement } from "../../../../types";
import { GetParametersElement } from "./helpers/GetParametersElement";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";

interface Props {
  element: InspectorElement;
  attributeLikeItems?: AttributeLikeItem[];
}

export const ParametersComponent = ({ element, attributeLikeItems }: Props) => {
  const parametersElement = GetParametersElement(element);
  return null;

  return (
    <ParametersContent
      parametersElement={parametersElement}
      inspectorParentElement={element}
      attributeLikeItems={attributeLikeItems}
    />
  );
};
