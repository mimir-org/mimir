import { client } from "store/webclient";
import { config, Project, ProjectSearchResult } from "lib";
import { typedJsonSetting } from "store";
import { TypedJSON } from "typedjson";

const _basePath = `${config.API_BASE_URL}project`;

export const projectApi = {
  async getProjects(name: string): Promise<ProjectSearchResult> {
    const r = await client.get<ProjectSearchResult>(_basePath + "/search?name=" + encodeURIComponent(name));
    const serializer = new TypedJSON(ProjectSearchResult, typedJsonSetting());
    return serializer.parse(r.data);
  },
  async getProject(id: string): Promise<Project> {
    const r = await client.get<Project>(id);
    const serializer = new TypedJSON(Project, typedJsonSetting());
    return serializer.parse(r.data);
  },
  async saveProject(project: Project): Promise<Project> {
    // return await client.post(_basePath, project);
    const r = await client.post<Project>(_basePath, project);
    const serializer = new TypedJSON(Project, typedJsonSetting());
    return serializer.parse(r.data);
  },
};
