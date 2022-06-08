import Config from "../../../../../../models/Config";
import { Project } from "@mimirorg/modelbuilder-types";
import { AdminContentWrapper, AdminLogo } from "./AdminComponent.styled";
import { InspectorElement } from "../../../../types";
import { statusSelector, useAppSelector } from "../../../../../../redux/store";
import { GetCompanyLogoForInspector } from "../../../../../../helpers/GetCompanyLogo";
import { GetAdminContent } from "./helpers/GetAdminContent";

interface Props {
  element: InspectorElement;
  project: Project;
}

export const AdminComponent = ({ element, project }: Props) => {
  const statuses = useAppSelector(statusSelector);
  const company = Config.COMPANY;

  return (
    <>
      <AdminLogo src={GetCompanyLogoForInspector(company, element)} alt="logo" />
      {element && <AdminContentWrapper>{GetAdminContent(element, project, statuses)}</AdminContentWrapper>}
    </>
  );
};
