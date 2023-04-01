import {
  Connection,
  ConnectionFulfilledBy,
  ConnectionHasLocation,
  ConnectionPartOf,
  ConnectionRelation,
  ConnectionTerminal,
} from "../Connection";

export class ConnectionAm {
  id: string;
  project: string;
  fromConnector: string;
  toConnector: string;
  mainProject: string;

  public constructor(obj: Connection) {
    this.id = obj.id;
    this.project = obj.project;
    this.fromConnector = obj.fromConnector;
    this.toConnector = obj.toConnector;
    this.mainProject = obj.mainProject;
  }
}

export class ConnectionTerminalAm extends ConnectionAm {
  public constructor(obj: ConnectionTerminal) {
    super(obj);
  }
}

export class ConnectionRelationAm extends ConnectionAm {
  public constructor(obj: ConnectionRelation) {
    super(obj);
  }
}

export class ConnectionFulfilledByAm extends ConnectionRelationAm {
  public constructor(obj: ConnectionFulfilledBy) {
    super(obj);
  }
}

export class ConnectionHasLocationAm extends ConnectionRelationAm {
  public constructor(obj: ConnectionHasLocation) {
    super(obj);
  }
}

export class ConnectionPartOfAm extends ConnectionRelationAm {
  public constructor(obj: ConnectionPartOf) {
    super(obj);
  }
}
