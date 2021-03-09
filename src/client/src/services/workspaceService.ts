import { AspectRatioSharp } from '@material-ui/icons';
import { brotliDecompress } from 'zlib';
import { Workspace, Node, Edge, Graph, Aspects, CategoryDescriptor } from '../models/workspace';
import { nodetypeReducer } from '../store/nodetypes/reducers';

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

    getFunctionalAspect(): Aspects[] {
        return this.workspace.aspects.filter(x => x.aspect === '1');
    }

    getProductAspect(): Aspects[] {
        return this.workspace.aspects.filter(x => x.aspect === '2');
    }

    getAreaAspect(): Aspects[] {
        return this.workspace.aspects.filter(x => x.aspect === '3');
    }

    getFunctionalAspectCategories() : CategoryDescriptor[] {
        let functionalCategories: CategoryDescriptor[] = [];
        const fAspect = this.getFunctionalAspect();
        fAspect.forEach(aspect => {
            functionalCategories.push({
                id: aspect.category,
                name: aspect.descriptor.name,
                description: aspect.descriptor.description
            });
        })
        return functionalCategories;
    }

    getProductAspectCategories() : CategoryDescriptor[] {
        let productCategories: CategoryDescriptor[] = [];
        const pAspect = this.getProductAspect();
        pAspect.forEach(aspect => {
            productCategories.push({
                id: aspect.category,
                name: aspect.descriptor.name,
                description: aspect.descriptor.description
            });
        })
        return productCategories;
    }

    getAreaAspectCategories() : CategoryDescriptor[] {
        let areaCategories: CategoryDescriptor[] = [];
        const aAspect = this.getAreaAspect();
        aAspect.forEach(aspect => {
            areaCategories.push({
                id: aspect.category,
                name: aspect.descriptor.name,
                description: aspect.descriptor.description
            });
        })
        if(!areaCategories || areaCategories.length <= 0){
            areaCategories.push({
                id: null,
                name: 'default',
                description: ''
            });
        }
        return areaCategories;
    }

    // getNodesConnectedToRoot(aspectId: string): Node[] {
    //     const aspectEdges: Edge[] = [];
    //     const aspectNodes: Node[] = [];
    //     const chosenAspect = this.workspace.aspects
	// 	.filter(x => x.aspect === aspectId);

	// 	chosenAspect.forEach(aspect => {
	// 		if(aspect.graph.edges.filter(e => e.to === 'root' && e.type === 'imfo:partOf')){
	// 			aspectEdges.push({
	// 				id: e.id;
	// 			});
	// 		}	
	// 	})

}



// const model = new DiagramModel();
//   const mainAspect = aspects.filter(x => x.aspect === "1" && x.category === "1")[0];
//   const productAspect = aspects.filter(x => x.aspect === "2" && x.category === "1")[0];
  

//   if(mainAspect) {
//     var nodeMap = new Map(mainAspect.graph.nodes.map(obj => [obj.id, obj] as [string, Node])); 