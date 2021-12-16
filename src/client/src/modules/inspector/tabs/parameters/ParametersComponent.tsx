import { Project } from "../../../../models";
import { IsCreateLibraryType } from "../../helpers/IsType";
import { AttributeLikeItem, InspectorElement } from "../../types";
import { ParametersContent } from "./";
import { GetParametersElement } from "./helpers/GetParametersElement";

interface Props {
  element: InspectorElement;
  project: Project;
  attributeLikeItems?: AttributeLikeItem[];
}

const ParametersComponent = ({ element, project, attributeLikeItems }: Props) => {
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
export default ParametersComponent;
