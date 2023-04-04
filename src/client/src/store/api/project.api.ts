import { client } from "store/webclient";
import { config, ProjectSearchResult } from "lib";
import { typedJsonSetting } from "store";
import { TypedJSON } from "typedjson";

const _basePath = `${config.API_BASE_URL}project`;

export const projectApi = {
  async getProjects(name: string): Promise<ProjectSearchResult> {
    const r = await client.get<ProjectSearchResult>(_basePath + "/search?name=" + encodeURIComponent(name));
    const serializer = new TypedJSON(ProjectSearchResult, typedJsonSetting());
    return serializer.parse(r.data);
  },
};
