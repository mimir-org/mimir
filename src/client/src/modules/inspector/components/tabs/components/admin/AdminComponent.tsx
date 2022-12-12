import { Project } from "@mimirorg/modelbuilder-types";
import { AdminContentWrapper, AdminLogo } from "./AdminComponent.styled";
import { InspectorElement } from "../../../../types";
import { GetAdminContent } from "./helpers/GetAdminContent";
import { useCompanySelector } from "../../../../../../hooks/useCompanySelector";

interface Props {
  element: InspectorElement;
  project: Project;
}

export const AdminComponent = ({ element, project }: Props) => {
  const company = useCompanySelector(element.domain, element.id);

  return (
    <>
      {company && <AdminLogo src={company.logo} alt={company.name} />}
      {element && <AdminContentWrapper>{GetAdminContent(element, project)}</AdminContentWrapper>}
    </>
  );
};
