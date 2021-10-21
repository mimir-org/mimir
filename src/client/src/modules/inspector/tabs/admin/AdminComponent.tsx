import { GetInspectorText, GetTabsColor } from "../../helpers";
import { useCallback } from "react";
import { Project } from "../../../../models";
import { changeInspectorTab } from "../../redux/tabs/actions";
import { TabHeader, TabBody, TabTitle } from "../../styled";
import { InspectorElement } from "../../types";
import { GetAdminContent } from "./GetAdminContent";
import { inspectorTabOpenSelector, statusSelector } from "../../../../redux/store";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../redux/store/hooks";

interface Props {
  element: InspectorElement;
  project: Project;
  index: number;
}

const AdminComponent = ({ element, project, index }: Props) => {
  const dispatch = useAppDispatch();
  const isTabOpen = useParametricAppSelector(inspectorTabOpenSelector, index);
  const statuses = useAppSelector(statusSelector);

  const onClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return (
    <>
      <TabHeader active={isTabOpen} onClick={onClick} color={GetTabsColor(element)}>
        <TabTitle active={isTabOpen}>{GetInspectorText(index)}</TabTitle>
      </TabHeader>

      {isTabOpen && (
        <TabBody id="admininfo">
          <hr />
          {element && project && <div className="container">{GetAdminContent(element, project, statuses)}</div>}
        </TabBody>
      )}
    </>
  );
};

export default AdminComponent;
