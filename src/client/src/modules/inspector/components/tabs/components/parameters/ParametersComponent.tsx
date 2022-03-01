import { Project } from "../../../../../../models";
import { IsCreateLibraryType } from "../../../../helpers/IsType";
import { AttributeLikeItem, InspectorElement } from "../../../../types";
import { GetParametersElement } from "./helpers/GetParametersElement";
import { ParametersContent } from "../shared/components/parametersContent/ParametersContent";

interface Props {
  element: InspectorElement;
  project: Project;
  attributeLikeItems?: AttributeLikeItem[];
}

export const ParametersComponent = ({ element, project, attributeLikeItems }: Props) => {
  const parametersElement = GetParametersElement(element);
  const elementIsLocked = !IsCreateLibraryType(element) ? element.isLocked : false;

  return (
    <ParametersContent
      parametersElement={parametersElement}
      inspectorParentElement={element}
      project={project}
      elementIsLocked={elementIsLocked}
      attributeLikeItems={attributeLikeItems}
    />
  );
};
