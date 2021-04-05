import {
  Workspace,
  Node,
  Edge,
  Aspects,
  Graph,
  CategoryDescriptor,
  AspectDescriptor,
  Connection,
} from "../models/workspace";
import {
  Diagram,
  DiagramNode,
  DiagramConnector,
  DiagramConnectorType,
  DiagramConnectionType,
  DiagramConnection,
  DIAGRAM_CONNECTOR_TYPE,
  DIAGRAM_CONNECTION_TYPE,
} from "./../models/diagram";
import { AspectRatioSharp } from "@material-ui/icons";
import { brotliDecompress } from "zlib";
// import { nodetypeReducer } from "../redux/store/library/reducers";

export class WorkspaceService {
  private workspace: Workspace;
  functionalNodeMap: Map<string, Node>;
  productNodeMap: Map<string, Node>;
  functionalEdgeMap: Map<string, Edge>;
  productEdgeMap: Map<string, Edge>;

  proxyNodeMap: Map<string, Node>;
  proxyEdgeMap: Map<string, Edge>;

  constructor(workspace: Workspace) {
    this.workspace = workspace;
    this.functionalNodeMap = this.createNodeMap("1", "1");
    this.productNodeMap = this.createNodeMap("2", "1");
    this.functionalEdgeMap = this.createEdgeMap("1", "1");
    this.productEdgeMap = this.createEdgeMap("2", "1");
    this.proxyNodeMap = new Map<string, Node>();
    this.proxyEdgeMap = new Map<string, Edge>();
  }

  createNodeMap(aspect: string, category: string): Map<string, Node> {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === aspect && x.category === category
    );
    if (!aspects && aspects.length <= 0) return new Map<string, Node>();

    return new Map(
      aspects[0].graph.nodes.map((obj) => [obj.id, obj] as [string, Node])
    );
  }

  createEdgeMap(aspect: string, category: string): Map<string, Edge> {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === aspect && x.category === category
    );
    if (!aspects && aspects.length <= 0) return new Map<string, Edge>();

    return new Map(
      aspects[0].graph.edges.map((obj) => [obj.id, obj] as [string, Edge])
    );
  }

  getProductLabel(nodeId: string): string {
    var actualProductnode = this.productNodeMap.get(nodeId);
    if (actualProductnode) {
      return actualProductnode.label;
    }

    const actualNode = this.functionalNodeMap.get(nodeId);

    if (!actualNode) return "";

    // TODO: Use Typeregister
    if (actualNode.type === "imft:Reservoir") return "Reservoir";
  }

  getRootEdges(nodeId: string): Edge[] {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === "1" && x.category === "1"
    );
    if (!aspects && aspects.length <= 0) return [];

    const edges = aspects[0].graph.edges.filter(
      (x) => x.to === nodeId && x.type === "imfo:partOf"
    );
    let filteredEdges: Edge[] = [];

    // TODO: Use Typeregister
    edges.forEach((edge) => {
      const node = this.functionalNodeMap.get(edge.from);
      if (
        node &&
        !node.type.toLowerCase().includes("input") &&
        !node.type.toLowerCase().includes("output")
      ) {
        filteredEdges.push(edge);
      }
    });
    return filteredEdges;
  }

  getConnectorEdges(nodeId: string): Edge[] {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === "1" && x.category === "1"
    );
    if (!aspects && aspects.length <= 0) return [];

    const edges = aspects[0].graph.edges.filter(
      (x) => x.to === nodeId && x.type === "imfo:partOf"
    );
    let filteredEdges: Edge[] = [];

    // TODO: Use Typeregister
    edges.forEach((edge) => {
      const node = this.functionalNodeMap.get(edge.from);
      if (
        node &&
        (node.type.toLowerCase().includes("input") ||
          node.type.toLowerCase().includes("output"))
      ) {
        filteredEdges.push(edge);
      }
    });
    return filteredEdges;
  }

  getFunctionalAspect(): Aspects[] {
    return this.workspace.aspects.filter((x) => x.aspect === "1");
  }

  getProductAspect(): Aspects[] {
    return this.workspace.aspects.filter((x) => x.aspect === "2");
  }

  getAreaAspect(): Aspects[] {
    return this.workspace.aspects.filter((x) => x.aspect === "3");
  }

  getFunctionalAspectCategories(): CategoryDescriptor[] {
    let functionalCategories: CategoryDescriptor[] = [];
    const fAspect = this.getFunctionalAspect();
    fAspect.forEach((aspect) => {
      functionalCategories.push({
        id: aspect.category,
        name: aspect.descriptor.name,
        description: aspect.descriptor.description,
      });
    });
    return functionalCategories;
  }

  getProductAspectCategories(): CategoryDescriptor[] {
    let productCategories: CategoryDescriptor[] = [];
    const pAspect = this.getProductAspect();
    pAspect.forEach((aspect) => {
      productCategories.push({
        id: aspect.category,
        name: aspect.descriptor.name,
        description: aspect.descriptor.description,
      });
    });
    return productCategories;
  }

  getAreaAspectCategories(): CategoryDescriptor[] {
    let areaCategories: CategoryDescriptor[] = [];
    const aAspect = this.getAreaAspect();
    aAspect.forEach((aspect) => {
      areaCategories.push({
        id: aspect.category,
        name: aspect.descriptor.name,
        description: aspect.descriptor.description,
      });
    });
    if (!areaCategories || areaCategories.length <= 0) {
      areaCategories.push({
        id: null,
        name: "default",
        description: "",
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

  getConnectionEdges(nodeId: string): Connection[] {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === "1" && x.category === "1"
    );

    if (!aspects && aspects.length <= 0) return [];

    const edges = aspects[0].graph.edges.filter(
      (x) => x.to === nodeId && x.type !== "imfo:partOf"
    );
    let filteredConnections: Connection[] = [];

    // TODO: Use Typeregister
    edges.forEach((edge) => {
      if (edge) {
        var parent = aspects[0].graph.edges.filter(
          (x) => x.from === edge.from && x.type === "imfo:partOf"
        );

        if (parent && parent.length > 0) {
          filteredConnections.push({
            id: edge.id,
            type: edge.type,
            from: parent[0].to,
            to: edge.to,
            connector: parent[0].id,
          });
        }
      }
    });

    return filteredConnections;
  }

  getDiagram(nodeId: string): Diagram {
    var aspects = this.workspace.aspects.filter(
      (x) => x.aspect === "1" && x.category === "1"
    );

    if (!aspects && aspects.length <= 0) return null;

    var diagram = new Diagram(
      nodeId,
      this.productNodeMap.get(nodeId)?.label ??
        this.functionalNodeMap.get(nodeId)?.label ??
        this.workspace.root.title
    );
    const nodeEdges = aspects[0].graph.edges.filter(
      (x) =>
        x.to === nodeId &&
        x.type === "imfo:partOf" &&
        !this.functionalNodeMap
          .get(x.from)
          .type.toLowerCase()
          .includes("input") &&
        !this.functionalNodeMap
          .get(x.from)
          .type.toLowerCase()
          .includes("output")
    );

    diagram.nodes = nodeEdges.map((x) => {
      const node = this.functionalNodeMap.get(x.from);
      const label = this.productNodeMap.get(node.id)?.label ?? node.type;
      const diagramNode = new DiagramNode(node.id, label);
      diagramNode.connectors = this.getConnectors(node.id, aspects[0]);

      diagram.connections = diagram.connections.concat(
        this.getConnections(node.id, aspects[0], diagramNode.connectors)
      );

      return diagramNode;
    });
    return diagram;
  }

  getConnectors(nodeId: string, aspects: Aspects): DiagramConnector[] {
    if (
      !aspects &&
      !aspects.graph &&
      !aspects.graph.edges &&
      aspects.graph.edges.length <= 0
    )
      return [];

    const connectors = aspects.graph.edges
      .filter(
        (x) =>
          x.to === nodeId &&
          x.type === "imfo:partOf" &&
          (this.functionalNodeMap
            .get(x.from)
            .type.toLowerCase()
            .includes("input") ||
            this.functionalNodeMap
              .get(x.from)
              .type.toLowerCase()
              .includes("output") ||
            this.functionalNodeMap
              .get(x.from)
              .type.toLowerCase()
              .includes("supply"))
      )
      .map((x) => {
        const diagramType = this.functionalNodeMap
          .get(x.from)
          .type.toLowerCase()
          .includes("input")
          ? (DIAGRAM_CONNECTOR_TYPE.TARGET as DiagramConnectorType)
          : (DIAGRAM_CONNECTOR_TYPE.SOURCE as DiagramConnectorType);
        const label = this.functionalNodeMap.get(x.from)?.type ?? x.type;
        return new DiagramConnector(x.id, label, diagramType);
      });
    return connectors;
  }

  getConnections(
    nodeId: string,
    aspects: Aspects,
    connectors: DiagramConnector[]
  ): DiagramConnection[] {
    if (
      !aspects &&
      !aspects.graph &&
      !aspects.graph.edges &&
      aspects.graph.edges.length <= 0
    )
      return [];

    return aspects.graph.edges
      .filter(
        (x) =>
          x.to === nodeId &&
          Object.values(DIAGRAM_CONNECTION_TYPE).includes(x.type)
      )
      .map((x) => {
        const sourceParentEdge = aspects.graph.edges.filter(
          (e) => e.from === "n2" && e.type === "imfo:partOf"
        )[0];
        const targetConnector = connectors.filter(
          (x) => x.type === DIAGRAM_CONNECTOR_TYPE.TARGET
        )[0];
        // TODO: This values must be dynamic
        return new DiagramConnection(
          x.id,
          x.type,
          sourceParentEdge.to,
          "e2",
          "n4",
          targetConnector.id,
          x.type as DiagramConnectionType
        );
      });
  }

  guid(): string {
    function _p8(s: boolean) {
      var p = (Math.random().toString(16) + "000000000").substr(2, 8);
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
  }

  getProxyNodes(aspect: Aspects) {
    if (
      !aspect &&
      !aspect.graph &&
      !aspect.graph.edges &&
      aspect.graph.edges.length <= 0
    )
      return;

    aspect.graph.nodes
      .filter(
        (x) =>
          !x.type.toLowerCase().includes("input") &&
          !x.type.toLowerCase().includes("output") &&
          !x.type.toLowerCase().includes("pipeline")
      )
      .forEach((n) => {
        const sourceNodeId = this.guid();
        const targetNodeId = this.guid();

        aspect.graph.nodes.push({
          id: sourceNodeId,
          type: "imfo:SupplyOutput",
          label: "Supply output",
        });
        aspect.graph.nodes.push({
          id: targetNodeId,
          type: "imfo:SupplyInput",
          label: "Supply input",
        });

        aspect.graph.edges.push({
          id: this.guid(),
          type: "imfo:partOf",
          from: sourceNodeId,
          to: n.id,
        });
        aspect.graph.edges.push({
          id: this.guid(),
          type: "imfo:partOf",
          from: targetNodeId,
          to: n.id,
        });
      });
  }
}
