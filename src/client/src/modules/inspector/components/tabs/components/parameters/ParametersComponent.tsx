import { InspectorElement } from "../../../../types";
import { GetParametersElement } from "./helpers/GetParametersElement";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";
import { Attribute } from "@mimirorg/modelbuilder-types";

interface Props {
  element: InspectorElement;
  attributes?: Attribute[];
}

export const ParametersComponent = ({ element, attributes }: Props) => {
  const parametersElement = GetParametersElement(element);

  return <ParametersContent parametersElement={parametersElement} inspectorParentElement={element} attributeItems={attributes} />;
};
