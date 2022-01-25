import { Project } from "../../../../models";
import { AdminContentWrapper, AdminLogo } from "../../styled";
import { InspectorElement } from "../../types";
import { GetAdminContent } from "./GetAdminContent";
import { statusSelector, useAppSelector } from "../../../../redux/store";
import { GetCompanyLogoForInspector } from "../../../../helpers";
import Config from "../../../../models/Config";

interface Props {
  element: InspectorElement;
  project: Project;
}

const AdminComponent = ({ element, project }: Props) => {
  const statuses = useAppSelector(statusSelector);
  const company = Config.COMPANY;

  return (
    <>
      <AdminLogo src={GetCompanyLogoForInspector(company, element)} alt="logo" />
      {element && <AdminContentWrapper>{GetAdminContent(element, project, statuses)}</AdminContentWrapper>}
    </>
  );
};

export default AdminComponent;
