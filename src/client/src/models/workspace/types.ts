export interface Root {
    title: string
}

export interface Graph {
    nodes: Node[],
    edges: Edge[]
}

export interface Node {
    id: string,
    type: string
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
}

export interface Workspace {
    root: Root,
    aspects: Aspects[] 
}
