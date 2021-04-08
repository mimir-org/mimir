import { WorkspaceService } from "../../services";
import { FlowTree } from "../flow";
import {
  AspectDescriptor,
  Aspects,
  Root,
  Workspace,
} from "../../models/workspace";

interface Props extends Workspace {
  aspectDescriptors: AspectDescriptor[];
  root: Root;
  aspects: Aspects[];
}

const TreeviewBody = ({ aspectDescriptors, root, aspects }: Props) => {
  const service = new WorkspaceService({ root, aspects, aspectDescriptors });
  const fcat = service.getFunctionalAspectCategories();
  const pcat = service.getProductAspectCategories();
  const acat = service.getAreaAspectCategories();
  // const fgraph = service.getNodesConnectedToRoot('1');

  return (
    <>
      <FlowTree />
    </>
  );
};

export default TreeviewBody;
