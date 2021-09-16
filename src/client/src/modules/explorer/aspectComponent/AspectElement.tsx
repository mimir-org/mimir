import { AspectElementBox } from "../../../compLibrary/box/aspect";
import { ExpandIcon, CollapseIcon } from "../../../assets/icons/common";
import { Node, Project } from "../../../models";
import { IsBlockView } from "../../../components/flow/helpers/block";
import { IsProduct } from "../../../components/flow/helpers/common";
import { Checkbox, CheckboxBlock } from "../checkboxComponent";

interface Props {
  node: Node;
  label: string;
  indent: number;
  project: Project;
  isLeaf: boolean;
  expanded: boolean;
  onElementExpanded: (expanded: boolean, nodeId: string) => void;
}

export const AspectElement = ({
  node,
  label,
  indent,
  project,
  expanded,
  isLeaf,
  onElementExpanded,
}: Props) => {
  const expandIcon = expanded ? ExpandIcon : CollapseIcon;

  return (
    <>
      <AspectElementBox indent={indent} node={node}>
        <div className="checkbox_container">
          {!IsBlockView() ? (
            <Checkbox node={node} project={project} inputLabel={label} />
          ) : (
            !IsProduct(node) && <CheckboxBlock node={node} inputLabel={label} />
          )}
        </div>
        {!isLeaf && (
          <img
            className="expandIcon"
            src={expandIcon}
            alt="expand-icon"
            onClick={() => {
              onElementExpanded(!expanded, node.id);
            }}
          ></img>
        )}
      </AspectElementBox>
    </>
  );
};

export default AspectElement;
