import { InspectorElement } from "../../../../types";
import { GetParametersElement } from "./helpers/GetParametersElement";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { Attribute } from "@mimirorg/modelbuilder-types";

interface Props {
  element: InspectorElement;
  attributeItems?: Attribute[];
}

export const ParametersComponent = ({ element, attributeItems }: Props) => {
  const parametersElement = GetParametersElement(element);

  return (
    <ParametersContent parametersElement={parametersElement} inspectorParentElement={element} attributeItems={attributeItems} />
  );
};
