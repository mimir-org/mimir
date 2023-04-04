import { jsonArrayMember, jsonObject, jsonMember } from "typedjson";
import { ProjectItem } from "./ProjectItem";

@jsonObject
export class ProjectSearchResult {
  // Domain members

  @jsonArrayMember(ProjectItem)
  public projects: Array<ProjectItem> = [];
}
