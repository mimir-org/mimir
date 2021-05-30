import { Input, InputBox, Select } from "../../../../componentLibrary";
import { Attribute } from "../../../../models/project";
import { TabColumn } from "../styled";

interface Props {
  list: Attribute[];
  handleChange: any;
  index?: number;
}

const SetColumn = ({ list, handleChange }: Props) => {
  return (
    <TabColumn>
      {list?.map((attr) => (
        <div>
          <div>{attr.key}</div>
          <InputBox>
            <Input
              value={attr.value ?? ""}
              onChange={(e: any) =>
                handleChange(attr.id, e.target.value, attr.unit)
              }
              inputType="tech"
            />
            <Select
              value={attr.unit}
              onChange={(e: any) =>
                handleChange(attr.id, attr.value, e.target.value)
              }
            >
              <option value={"NotSet"}>NotSet</option>
              {attr.units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </InputBox>
        </div>
      ))}
    </TabColumn>
  );
};

export default SetColumn;
