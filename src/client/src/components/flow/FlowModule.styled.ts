import styled from "styled-components";

export const FlowModuleContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  z-index: 1 !important;

  .reactflow-wrapper {
    flex: 1;
    height: 100%;
    width: 100%;
    z-index: 1 !important;
  }

  .react-flow__nodes {
    z-index: 5 !important;
  }

  .react-flow__node {
    z-index: 5 !important;
  }

  .react-flow__edges {
    z-index: 2 !important;
  }

  .react-flow__pane {
    top: 40px; // Place the pane below the Header and ToolbarComponent
    height: 93% !important; // Place the pane above the InspectorComponent
  }

  .react-flow__handle.connectable {
    cursor: crosshair;
  }

  .react-flow__handle {
    position: absolute;
    width: 19px !important;
    height: 19px !important;
    border-radius: 0 !important;
    border: none !important;
    background-color: transparent !important;
  }

  #react-flow__arrowclosed {
    :first-child {
      fill: var(--arrow-color);
      stroke: var(--arrow-color);
    }
  }

  #react-flow__arrow {
    :first-child {
      fill: var(--arrow-color);
      stroke: var(--arrow-color);
      transform: rotate(180deg);
    }
  }

  .react-flow__node-AspectLocation,
  .react-flow__node-Location {
    &.selected > div {
      border-color: #a300a7 !important;
    }
  }

  .react-flow__node-AspectFunction,
  .react-flow__node-Function {
    &.selected > div {
      border-color: #fbc913 !important;
    }
  }

  .react-flow__node-AspectProduct,
  .react-flow__node-Product {
    &.selected > div {
      border-color: #069098 !important;
    }
  }

  // TREE EDGES
  .path-treePartOfEdge,
  .path-treeTransportEdge,
  .path-treeRelationSourceEdge,
  .path-treeRelationTargetEdge {
    stroke-width: 4px !important;
    fill: none;
    pointer-events: visibleStroke;
    cursor: grab;
  }

  .react-flow__edge-TreePartOfEdgeType,
  .react-flow__edge-TreeTransportEdgeType,
  .react-flow__edge-TreeRelationEdgeType {
    &.selected {
      .path-treePartOfEdge,
      .path-treeTransportEdge,
      .path-treeRelationSourceEdge,
      .path-treeRelationTargetEdge {
        stroke-width: 8px !important;
        border: 1px solid black;
      }
      .path-treeRelationTargetEdge {
        stroke-dasharray: 6, 15;
      }
    }
  }

  // BLOCK EDGES
  .path-blockTransportEdge,
  .path-blockRelationSourceEdge,
  .path-blockRelationTargetEdge,
  .path-blockPartOfEdge {
    stroke-width: 4px !important;
    fill: none;
    pointer-events: visibleStroke;
    cursor: grab;
  }

  .react-flow__edge-BlockTransportEdgeType,
  .react-flow__edge-BlockRelationEdgeType,
  .react-flow__edge-BlockPartOfEdgeType {
    &.selected {
      .path-blockTransportEdge,
      .path-blockRelationSourceEdge,
      .path-blockRelationTargetEdge,
      .path-blockPartOfEdge,
      .path-blockOffPageEdge {
        stroke-width: 8px !important;
      }
      .path-blockRelationTargetEdge {
        stroke-dasharray: 6, 15;
      }
    }
  }
`;
