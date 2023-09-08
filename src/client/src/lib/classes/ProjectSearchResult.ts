/* eslint-disable @typescript-eslint/no-unused-vars */
import { jsonArrayMember, jsonObject } from "typedjson";
import { Project } from "./Project";

@jsonObject({
  knownTypes: [Project],
})
export class ProjectSearchResult {
  // Domain members

  @jsonArrayMember(Project)
  public projects: Array<Project> = [];
}
