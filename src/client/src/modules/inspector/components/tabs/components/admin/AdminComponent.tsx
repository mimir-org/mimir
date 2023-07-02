import { AdminContentWrapper, AdminLogo } from "./AdminComponent.styled";
import { InspectorElement } from "../../../../types";
import { GetAdminContent } from "./helpers/GetAdminContent";
import { useCompanySelector } from "../../../../../../hooks/useCompanySelector";
import { Project } from "lib";

interface Props {
  element: InspectorElement;
  project: Project;
}

export const AdminComponent = ({ element, project }: Props) => {
  const company = useCompanySelector("", element.id); // TODO: Fix this

  return (
    <>
      {company && <AdminLogo src={company.logo} alt={company.name} />}
      {element && <AdminContentWrapper>{GetAdminContent(element, project)}</AdminContentWrapper>}
    </>
  );
};
