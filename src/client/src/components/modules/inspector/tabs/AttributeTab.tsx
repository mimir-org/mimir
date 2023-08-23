import { Attribute } from "../../../../lib";
import { TabContainerWrapper } from "./TabContainerWrapper.styled";
import { Flexbox, Form } from "@mimirorg/component-library";
import { projectStateSelector, useAppSelector } from "../../../../store";
import { ProjectState, updateProject } from "../../../../store/reducers/projectReducer";
import { useDispatch } from "react-redux";
import { AttributeItem } from "../tabComponents/AttributeItem";

interface AttributeTabProps {
  attributes: Attribute[];
}

export const AttributeTab = ({ attributes }: AttributeTabProps) => {
  const dispatch = useDispatch();
  const projectState = useAppSelector<ProjectState>(projectStateSelector);

  const handleInputChange = (id: string, value: string) => {
    const attributeToUpdate = attributes.find((attr) => attr.id === id);
    if (attributeToUpdate) {
      attributeToUpdate.value = value;
      dispatch(updateProject({ ...projectState }));
    }
  };

  const handleUnitChange = (id: string, unit: string) => {
    const attributeToUpdate = attributes.find((attr) => attr.id === id);
    if (attributeToUpdate) {
      attributeToUpdate.unitSelected = unit;
      dispatch(updateProject({ ...projectState }));
    }
  };

  return (
    attributes.length > 0 && (
      <TabContainerWrapper>
        <Form>
          <Flexbox flexDirection={"row"} style={{ marginBottom: "200px" }}>
            {attributes.map((attribute) => (
              <AttributeItem
                key={attribute.id}
                attribute={attribute}
                onInputChange={handleInputChange}
                onUnitChange={handleUnitChange}
              />
            ))}
          </Flexbox>
        </Form>
      </TabContainerWrapper>
    )
  );
};
