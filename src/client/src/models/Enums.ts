export enum Aspect {
  NotSet = 0,
  None = 1,
  Function = 2,
  Product = 4,
  Location = 8,
}
export enum ConnectorType {
  Input = 0,
  Output = 1,
  Bidirectional = 2,
}

export enum RelationType {
  NotSet = 0,
  HasLocation = 1,
  PartOf = 2,
  FulfilledBy = 3,
}

export enum ObjectType {
  NotSet = 0,
  ObjectBlock = 1,
  Transport = 2,
  Interface = 3,
}

export enum LibraryFilter {
  Node = 0,
  Transport = 1,
  Interface = 2,
}

export enum Discipline {
  None = 0,
  NotSet = 1,
  ProjectManagement = 2,
  Electrical = 4,
  Automation = 8,
  Structural = 16,
  Operation = 32,
  Process = 64,
}

export enum CommitStatus {
  NotSet = 0,
  Working = 1,
  Review = 2,
  Approved = 4,
  Committed = 8,
  Sent = 16,
}

export enum SelectType {
  None = 0,
  SingleSelect = 1,
  MultiSelect = 2,
}

export enum AspectColorType {
  Main = 0,
  Selected = 1,
  Header = 2,
  Tab = 3,
}

export enum WorkerStatus {
  None = 0,
  Create = 1,
  Update = 2,
  Delete = 3,
}
