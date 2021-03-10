export interface Root {
    title: string
}

export interface Graph {
    nodes: Node[],
    edges: Edge[]
}

export interface Node {
    id: string,
    type: string,
    label: string
}

export interface Edge {
    id: string,
    type: string,
    from: string,
    to: string
}

export interface Aspects {
    aspect: string,
    category: string,
    graph: Graph
    descriptor: CategoryDescriptor
}

export interface Workspace {
    root: Root,
    aspects: Aspects[],
    aspectDescriptors: AspectDescriptor[]
}
export interface CategoryDescriptor {
    id: string,
    name: string,
    description: string
}

export interface AspectDescriptor {
    id: string,
    name: string,
    color: string,
    description: string
}

export interface Connection {
    id: string,
    type: string,
    from: string,
    to: string,
    connector: string
}
