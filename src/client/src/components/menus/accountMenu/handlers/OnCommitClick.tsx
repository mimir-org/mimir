import { ProjectState } from "../../../../redux/store/project/types";
import { MENU_TYPE } from "../../../../models/project";
import { changeMenu } from "../../../../redux/store/projectMenu/actions";
import { commitProject } from "../../../../redux/store/project/actions";
import { CommitPackage, CommitStatus } from "../../../../models";

const OnCommitClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  if (projectState.project) {
    const commitPackage = {
      projectId: projectState.project.id,
      commitStatus: CommitStatus.Sent,
      parser: "rdfparser",
    } as CommitPackage;
    dispatch(commitProject(commitPackage));
  }
};

export default OnCommitClick;
