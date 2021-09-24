import { Attribute } from "../../../models";
import { TabRow } from "../../inspector/styled";
import { CreateId } from "../../../components/flow/helpers/common";
import { InputBox, AttributeField } from "../../../compLibrary";
import { InputWrapper } from "../styled";

const ParametersEdgeComponent = ({ edge }) => {
  let nodeAttributes: Attribute[] = [];
  nodeAttributes = edge.attributes;

  return (
    <TabRow>
      {nodeAttributes?.map((attr) => {
        let inputFieldWidth = (attr.value?.length ?? 1) * 3 + 10;

        return (
          <AttributeField key={CreateId()}>
            <div>{attr.key}</div>
            <InputBox>
              <InputWrapper width={inputFieldWidth + "%"} rightMargin={"4px"}>
                {/* <Input
                  value={attr.value ?? ""}
                  onChange={(e: any) =>
                    handleOnNodeChange(attr.id, e.target.value, attr.unit)
                  }
                  inputType="tech"
                /> */}
              </InputWrapper>
              <InputWrapper width={100 - inputFieldWidth + "%"}>
                {/* <Select
                  value={attr.unit ?? ""}
                  onChange={(e: any) =>
                    handleOnNodeChange(attr.id, attr.value, e.target.value)
                  }
                >
                  <option value={"NotSet"}>NotSet</option>
                  {attr.units?.map((unit) => (
                    <option value={unit.id}>{unit.name}</option>
                  ))}
                </Select> */}
              </InputWrapper>
            </InputBox>
          </AttributeField>
        );
      })}
    </TabRow>
  );
};
export default ParametersEdgeComponent;
