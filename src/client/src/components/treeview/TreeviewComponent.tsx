import { FC } from "react";
import "./treeview.scss";
import { Workspace } from "../../models/workspace";
import { TreeviewHeader, TreeviewBody } from "./";

const TreeviewComponent: FC<Workspace> = ({
  root,
  aspects,
  aspectDescriptors,
}: Workspace) => (
  <div className="treeview_component">
    <div className="treestructur_container">
      <TreeviewHeader title={root.title} />
      <TreeviewBody
        aspectDescriptors={aspectDescriptors}
        root={root}
        aspects={aspects}
      />
    </div>
  </div>
);
export default TreeviewComponent;
