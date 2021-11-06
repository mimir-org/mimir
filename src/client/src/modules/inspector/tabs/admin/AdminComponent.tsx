import { GetInspectorText, GetTabsColor } from "../../helpers";
import { useCallback } from "react";
import { Project } from "../../../../models";
import { changeInspectorTab } from "../../redux/tabs/actions";
import { TabHeader, TabBody, TabTitle, AdminInfoLogoBox } from "../../styled";
import { InspectorElement } from "../../types";
import { GetAdminContent } from "./GetAdminContent";
import { statusSelector } from "../../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../../redux/store/hooks";
import { Action } from "redux";
import { GetInspectorCompanyLogo } from "../../../../helpers";

interface Props {
  element: InspectorElement;
  project: Project;
  index: number;
  activeTabIndex: number;
  changeInspectorTabAction?: (index: number) => Action;
}

const AdminComponent = ({ element, project, index, activeTabIndex, changeInspectorTabAction = changeInspectorTab }: Props) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(statusSelector);
  const isTabOpen = activeTabIndex === index;
  const company = process.env.REACT_APP_COMPANY;

  const onClick = useCallback(() => {
    dispatch(changeInspectorTabAction(index));
  }, [dispatch, changeInspectorTabAction, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id="admininfo">
          <AdminInfoLogoBox>
            <img src={GetInspectorCompanyLogo(company, element)} alt="logo" className="logo" />
          </AdminInfoLogoBox>
          <hr />
          {element && <div className="container">{GetAdminContent(element, project, statuses)}</div>}
        </TabBody>
      )}
    </>
  );
};

export default AdminComponent;
