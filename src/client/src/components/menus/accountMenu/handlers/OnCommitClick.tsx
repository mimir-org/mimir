import { ProjectState } from "../../../../redux/store/project/types";
import { setAccountMenuVisibility } from "../../../../redux/store/projectMenu/actions";
import { commitProject } from "../../../../redux/store/project/actions";
import { CommitPackage, CommitStatus } from "../../../../models";

const OnCommitClick = (dispatch: any, projectState: ProjectState) => {
  dispatch(setAccountMenuVisibility(false));
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
