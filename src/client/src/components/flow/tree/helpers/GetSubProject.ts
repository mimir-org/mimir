import { Project } from "../../../../models";
import Config from "../../../../models/Config";
import { get } from "../../../../models/webclient";

const GetSubProject = async (projectId: string): Promise<Project> => {
  try {
    const url = Config.API_BASE_URL + "subproject/" + projectId;
    const response = await get(url);
    if (response.ok) return response.data as Project;

    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export default GetSubProject;
