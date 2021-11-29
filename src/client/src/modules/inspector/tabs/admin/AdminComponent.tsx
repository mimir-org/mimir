import { Project } from "../../../../models";
import { AdminInfoLogoBox } from "../../styled";
import { InspectorElement } from "../../types";
import { GetAdminContent } from "./GetAdminContent";
import { statusSelector } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/store/hooks";
import { GetCompanyLogoForInspector } from "../../../../helpers";

interface Props {
  element: InspectorElement;
  project: Project;
}

const AdminComponent = ({ element, project }: Props) => {
  const statuses = useAppSelector(statusSelector);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <AdminInfoLogoBox>
        <img src={GetCompanyLogoForInspector(company, element)} alt="logo" className="logo" />
      </AdminInfoLogoBox>
      <hr />
      {element && <div className="container">{GetAdminContent(element, project, statuses)}</div>}
    </>
  );
};

export default AdminComponent;
