import { Input, InputBox, Select } from "../../../compLibrary";
import { Attribute } from "../../../models";
import { CreateId } from "../../../components/flow/helpers/common";
import { TabColumn } from "../../../compLibrary/box/inspector";

interface Props {
  list: Attribute[];
  handleChange: any;
}

const SetNodeColumn = ({ list, handleChange }: Props) => (
  <TabColumn id={CreateId()}>
    {list?.map((attr) => (
      <div key={attr.id}>
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
              <option>{unit}</option>
            ))}
          </Select>
        </InputBox>
      </div>
    ))}
  </TabColumn>
);

export default SetNodeColumn;
