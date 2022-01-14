import { changeActiveMenu, setProjectMenuVisibility } from "../../redux/menuSlice";
import { commitProject } from "../../../../../../redux/store/project/actions";
import { CommitPackage, CommitStatus } from "../../../../../../models";
import { Dispatch } from "redux";

const OnCommitProjectClick = (dispatch: Dispatch, projectId: string, parserId: string, receiverDomain: string) => {
  const commitPackage = {
    projectId: projectId,
    commitStatus: CommitStatus.Review,
    parser: parserId,
    receivingDomain: receiverDomain,
  } as CommitPackage;

  dispatch(commitProject(commitPackage));
  dispatch(changeActiveMenu(null));
  dispatch(setProjectMenuVisibility(false));
};

export default OnCommitProjectClick;
