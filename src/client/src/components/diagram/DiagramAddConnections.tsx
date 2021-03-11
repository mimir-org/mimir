const DiagramAddConnections = (diagram, initialElements, ArrowHeadType) => {
  // Create connections
  diagram.connections.forEach((con) => {
    initialElements.push({
      id: con.id,
      source: con.source,
      sourceHandle: con.sourceHandle,
      target: con.target,
      targetHandle: con.targetHandle,
      animated: true,
      style: { stroke: "#888" },
      label: con.label,
      arrowHeadType: ArrowHeadType.ArrowClosed,
    });
  });
};

export default DiagramAddConnections;
