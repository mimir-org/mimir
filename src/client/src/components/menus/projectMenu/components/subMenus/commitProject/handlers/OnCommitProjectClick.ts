import { changeActiveMenu } from "../../redux/menuSlice";
import { commitProject } from "../../../../../../../redux/store/project/actions";
import { CommitPackage } from "../../../../../../../models";
import { Dispatch } from "redux";
import { CommitStatus } from "@mimirorg/modelbuilder-types";

const OnCommitProjectClick = (dispatch: Dispatch, projectId: string, parserId: string, receiverDomain: string) => {
  const commitPackage = {
    projectId: projectId,
    commitStatus: CommitStatus.Review,
    parser: parserId,
    receivingDomain: receiverDomain,
  } as CommitPackage;

  dispatch(commitProject(commitPackage));
  dispatch(changeActiveMenu(null));
};

export default OnCommitProjectClick;
