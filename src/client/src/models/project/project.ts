export type NodeType = keyof typeof NODE_TYPE;

export const NODE_TYPE = {
  FACET: "FACET",
  FUNCTION: "FUNCTION",
  PRODUCT: "PRODUCT",
  LOCATION: "LOCATION"
};

export interface Project {
    id: string,
    name: string,
    description: string,
    function: Aspect,
    product: Aspect,
    location: Aspect
}

export interface Aspect {
    name: string,
    children: Node[]
}

export interface Connector {
    id: string,
    name: string,
    type: string
}

export interface Connection {
    id: string,
    from: Connector,
    to: Connector
}

export interface Position {
    x: number,
    y: number
}

export interface Node {
    id: string,
    name: string,
    label: string,
    type: NodeType,
    children: Node[],
    position: Position
}