import { Checkbox } from "../../../compLibrary/input/checkbox/common";

interface Props {
  id: string;
  onChange: () => void;
  isChecked: boolean;
}

const MultiSelectCheckbox = ({ id, onChange, isChecked }: Props) => {
  return (
    <>
      <Checkbox id={id} isChecked={isChecked} onChange={onChange} />
    </>
  );
};

export default MultiSelectCheckbox;
