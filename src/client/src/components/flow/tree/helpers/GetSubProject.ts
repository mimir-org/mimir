import { Project } from "@mimirorg/modelbuilder-types";
import Config from "../../../../lib/config/config";
import { get } from "../../../../lib/models/webclient";

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
