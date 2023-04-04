import { jsonObject, jsonMember } from "typedjson";

@jsonObject
export class ProjectItem {
  // Domain members
  @jsonMember(String)
  public id = "";

  @jsonMember(String)
  public iri = "";

  @jsonMember(String)
  public domain = "";

  @jsonMember(String)
  public name = "";

  @jsonMember(String)
  public version = "";

  @jsonMember(String)
  public description = "";

  @jsonMember(String)
  public projectOwner = "";

  @jsonMember(Date)
  public updated: Date = null;

  @jsonMember(String)
  public updatedBy = "";

  // Client members
  public selected: boolean;
}
