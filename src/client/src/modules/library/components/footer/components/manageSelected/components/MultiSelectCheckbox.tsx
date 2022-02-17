import { Checkbox } from "../../../../../../../compLibrary/input/checkbox/common";

interface Props {
  id: string;
  onChange: () => void;
  isChecked: boolean;
}

export const MultiSelectCheckbox = ({ id, onChange, isChecked }: Props) => (
  <Checkbox id={id} isChecked={isChecked} onChange={onChange} />
);
