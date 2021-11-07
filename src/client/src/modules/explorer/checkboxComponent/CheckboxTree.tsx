import { AspectColorType, Node, Project } from "../../../models";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";
import { CheckboxTreeWrapper } from "./styled";
import { GetAspectColor } from "../../../helpers";

interface Props {
  node: Node;
  project: Project;
  inputLabel: string;
}
export const CheckboxTree = ({ node, project, inputLabel }: Props) => (
  <CheckboxTreeWrapper color={GetAspectColor(node, AspectColorType.Selected)}>
    <input type="checkbox" checked={!node?.isHidden ?? false} onChange={ChangeNodeDisplay(node, project)} />
    <div className="label">{inputLabel}</div>
  </CheckboxTreeWrapper>
);

export default CheckboxTree;
