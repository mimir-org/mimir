import { Node, Project } from "../../../models";
import { Color } from "../../../compLibrary";
import { ChangeNodeDisplay } from "../helpers/ChangeNodeDisplay";
import { IsLocation, IsProduct, IsFunction } from "../../../components/flow/helpers";
import { CheckboxWrapper } from "./styled";

interface Props {
  node: Node;
  project: Project;
  inputLabel: string;
}
export const Checkbox = ({ node, project, inputLabel }: Props) => {
  const GetCheckboxColor = () => {
    if (IsFunction(node)) return Color.FunctionSelected;
    if (IsLocation(node)) return Color.LocationSelected;
    if (IsProduct(node)) return Color.ProductSelected;
  };

  return (
    <CheckboxWrapper color={GetCheckboxColor()}>
      <input type="checkbox" checked={!node?.isHidden ?? false} onChange={ChangeNodeDisplay(node, project)} />
      <div className="checkmark"></div>
      {inputLabel}
    </CheckboxWrapper>
  );
};

export default Checkbox;
