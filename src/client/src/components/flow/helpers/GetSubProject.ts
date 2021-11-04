import { Project } from "../../../models";
import { get } from "../../../models/webclient";
import { InitializeProject } from "../../../redux/sagas/project";

const GetSubProject = async (projectId: string): Promise<Project> => {
  try {
    const url = process.env.REACT_APP_API_BASE_URL + "subproject/" + projectId;
    const response = await get(url);
    if (response.ok) {
      return InitializeProject(response.data as Project);
    }
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export default GetSubProject;