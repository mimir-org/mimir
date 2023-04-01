import { Project, AspectObjectAm, ConnectionAm } from "..";

export class ProjectAm {
  id: string;
  name: string;
  isSubProject: boolean;
  version: string;
  description: string | null;
  updatedBy: string | null;
  updated: Date | null;
  created: Date;
  createdBy: string;
  aspectObjects: AspectObjectAm[] | null;
  connections: ConnectionAm[] | null;

  public constructor(obj: Project) {
    this.id = obj.id;
    this.name = obj.name;
    this.isSubProject = obj.isSubProject;
    this.version = obj.version;
    this.description = obj.description;
    this.updatedBy = obj.updatedBy;
    this.updated = obj.updated;
    this.created = obj.created;
    this.createdBy = obj.createdBy;
    this.aspectObjects = obj.aspectObjects.map((x) => new AspectObjectAm(x));
    this.connections = obj.connections.map((x) => new ConnectionAm(x));
  }
}
