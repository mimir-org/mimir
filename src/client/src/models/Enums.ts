export enum Aspect {
    None = 0,
    NotSet = 1,
    Function = 2,
    Product = 4,
    Location = 8,
}

export enum ConnectorType {
    Input = 0,
    Output = 1,
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
    Simple = 4
}

export enum TypeMode {
    NotSet = 0,
    New = 1,
    Edit = 2,
}

export enum LibraryFilter {
    Node = 0,
    Transport = 1,
    Interface = 2,
}