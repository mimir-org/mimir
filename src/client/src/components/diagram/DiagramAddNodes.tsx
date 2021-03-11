const DiagramAddNodes = (diagram, initialElements) => {
  diagram.nodes.forEach((x) => {
    // Map connectors
    const connectors = x.connectors.map((connector) => {
      return {
        id: connector.id,
        type: connector.type,
        label: connector.label,
      };
    });

    // Create the node with connectors
    initialElements.push({
      id: x.id,
      type: "selectorNode",
      data: { label: x.label, id: x.id, connectors: connectors },
      position: { x: 300, y: 50 },
    });
  });
};

export default DiagramAddNodes;
