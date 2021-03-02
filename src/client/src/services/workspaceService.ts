import { Workspace, Node, Edge, AspectDescriptor, Connection } from '../models/workspace';
export class WorkspaceService {
    private workspace: Workspace;
    functionalNodeMap: Map<string, Node>;
    productNodeMap: Map<string, Node>;
    functionalEdgeMap: Map<string, Edge>;
    productEdgeMap: Map<string, Edge>;

    constructor(workspace: Workspace) {
        this.workspace = workspace;
        this.functionalNodeMap = this.createNodeMap('1', '1');
        this.productNodeMap = this.createNodeMap('2', '1');
        this.functionalEdgeMap = this.createEdgeMap('1', '1');
        this.productEdgeMap = this.createEdgeMap('2', '1');
    }

    createNodeMap(aspect: string, category: string): Map<string, Node> {
        var aspects = this.workspace.aspects.filter(x => x.aspect === aspect && x.category === category);
        if(!aspects && aspects.length <= 0)
            return new Map<string, Node>();

        return new Map(aspects[0].graph.nodes.map(obj => [obj.id, obj] as [string, Node]));
    }

    createEdgeMap(aspect: string, category: string): Map<string, Edge> {
        var aspects = this.workspace.aspects.filter(x => x.aspect === aspect && x.category === category);
        if(!aspects && aspects.length <= 0)
            return new Map<string, Edge>();

        return new Map(aspects[0].graph.edges.map(obj => [obj.id, obj] as [string, Edge]));
    }

    getProductLabel(nodeId: string): string {
        var actualProductnode = this.productNodeMap.get(nodeId);
        if(actualProductnode) {
            return actualProductnode.label;
        }

        const actualNode = this.functionalNodeMap.get(nodeId);
        
        if(!actualNode)
            return '';

        // TODO: Use Typeregister
        if(actualNode.type === 'imft:Reservoir')
            return 'Reservoir';        
    }

    getRootEdges(nodeId: string): Edge[] {
        var aspects = this.workspace.aspects.filter(x => x.aspect === '1' && x.category === '1');
        if(!aspects && aspects.length <= 0)
            return [];
        
        const edges = aspects[0].graph.edges.filter(x => x.to === nodeId && x.type === 'imfo:partOf');
        let filteredEdges: Edge[] = [];

        // TODO: Use Typeregister
        edges.forEach(edge => {
            const node = this.functionalNodeMap.get(edge.from);
            if(node && !node.type.toLowerCase().includes('input') && !node.type.toLowerCase().includes('output') && !node.type.toLowerCase().includes('pipeline')) {
                filteredEdges.push(edge);
            }                
        });
        return filteredEdges;
    }

    getConnectorEdges(nodeId: string): Edge[] {
        var aspects = this.workspace.aspects.filter(x => x.aspect === '1' && x.category === '1');
        if(!aspects && aspects.length <= 0)
            return [];
        
        const edges = aspects[0].graph.edges.filter(x => x.to === nodeId && x.type === 'imfo:partOf');
        let filteredEdges: Edge[] = [];

        // TODO: Use Typeregister
        edges.forEach(edge => {
            const node = this.functionalNodeMap.get(edge.from);
            if(node && (node.type.toLowerCase().includes('input') || node.type.toLowerCase().includes('output'))) {
                filteredEdges.push(edge);
            }                
        });
        return filteredEdges;
    }

    getConnectionEdges(nodeId: string): Connection[] {
        var aspects = this.workspace.aspects.filter(x => x.aspect === '1' && x.category === '1');
        
        if(!aspects && aspects.length <= 0)
            return [];

            const edges = aspects[0].graph.edges.filter(x => x.to === nodeId && x.type !== 'imfo:partOf');
            let filteredConnections: Connection[] = [];

        // TODO: Use Typeregister
        edges.forEach(edge => {
            if(edge) {           
                var parent = aspects[0].graph.edges.filter(x => x.from === edge.from && x.type === 'imfo:partOf');
                if(parent && parent.length > 0)
                {
                    filteredConnections.push({
                        id: edge.id,
                        type: edge.type,
                        from: parent[0].to,
                        to: edge.to,
                        connector: parent[0].id
                    });
                }
            }              
        });

        return filteredConnections;
    }
}



// const model = new DiagramModel();
//   const mainAspect = aspects.filter(x => x.aspect === "1" && x.category === "1")[0];
//   const productAspect = aspects.filter(x => x.aspect === "2" && x.category === "1")[0];
  

//   if(mainAspect) {
//     var nodeMap = new Map(mainAspect.graph.nodes.map(obj => [obj.id, obj] as [string, Node])); 