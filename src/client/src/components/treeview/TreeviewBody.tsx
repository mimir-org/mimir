import { TreeviewAspectInfo, TreeviewAspectDropdown } from "./";
import { WorkspaceService } from "../../services";
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
    <div className="aspects_container">
      {aspectDescriptors.map((aspect) => (
        <div className="aspect_container">
          <TreeviewAspectInfo id={aspect.id} name={aspect.name} />
          <TreeviewAspectDropdown
            id={aspect.id}
            functional={fcat}
            product={pcat}
            location={acat}
          />
          <div className="aspect_view"></div>
        </div>
      ))}
    </div>
  );
};

export default TreeviewBody;
