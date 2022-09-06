import { Project } from "@mimirorg/modelbuilder-types";
import { AdminContentWrapper, AdminLogo } from "./AdminComponent.styled";
import { InspectorElement } from "../../../../types";
import { commonStateCompanySelector, useAppSelector } from "../../../../../../redux/store";
import { GetAdminContent } from "./helpers/GetAdminContent";

interface Props {
  element: InspectorElement;
  project: Project;
}

export const AdminComponent = ({ element, project }: Props) => {
  const company = useAppSelector(commonStateCompanySelector);

  return (
    <>
      <AdminLogo src={company.logo} alt={company.name} />
      {element && <AdminContentWrapper>{GetAdminContent(element, project)}</AdminContentWrapper>}
    </>
  );
};
