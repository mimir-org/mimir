import { ProjectState } from "../../../../redux/store/project/types";
import { setAccountMenuVisibility } from "../../../menus/project/redux/actions";
import { commitProject } from "../../../../redux/store/project/actions";
import { CommitPackage, CommitStatus } from "../../../../models";

const OnCommitClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setAccountMenuVisibility(false));
  if (projectState.project) {
    const commitPackage = {
      projectId: projectState.project.id,
      commitStatus: CommitStatus.Sent,
      parser: "rdfparser",
      receivingDomain: "aibel.com",
    } as CommitPackage;
    dispatch(commitProject(commitPackage));
  }
};

export default OnCommitClick;
