import { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/index";
import { Color } from "../../componentLibrary";
import CreateLocationNodes from "./helpers/locationNode/CreateLocationNodes";
import { BackgroundVariant, Project } from "../../models/project";
import { GetBlockNodeTypes, GetBlockEdgeTypes } from "./helpers";
import ReactFlow, {
  ReactFlowProvider,
  Elements,
  Background,
} from "react-flow-renderer";

const FlowBlockLocation = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState<Elements>();

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const OnLoad = useCallback(
    (_reactFlowInstance) => {
      setElements(CreateLocationNodes(project));
      return setReactFlowInstance(_reactFlowInstance);
    },
    [project]
  );

  return (
    project && (
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onLoad={OnLoad}
            nodeTypes={GetBlockNodeTypes}
            edgeTypes={GetBlockEdgeTypes}
            defaultZoom={1}
            snapToGrid={true}
            zoomOnScroll={false}
            paneMoveable={false}
          ></ReactFlow>
          <Background
            size={0.5}
            color={Color.Grey}
            variant={BackgroundVariant.Lines}
          />
        </div>
      </ReactFlowProvider>
    )
  );
};

export default FlowBlockLocation;
