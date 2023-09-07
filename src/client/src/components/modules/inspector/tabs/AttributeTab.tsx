import { Attribute } from "../../../../lib";
import { TabContainerWrapper } from "./TabContainerWrapper.styled";
import { Flexbox, Form } from "@mimirorg/component-library";
import { projectStateSelector, useAppSelector } from "../../../../store";
import { ProjectState, updateProject } from "../../../../store/reducers/projectReducer";
import { useDispatch } from "react-redux";
import { AttributeItem } from "../tabComponents/AttributeItem";

/**
 * This is the AttributeTabProps interface. It defines the props for the AttributeTab component.
 * @param {Attribute[]} attributes
 * @interface AttributeTabProps
 */
interface AttributeTabProps {
  attributes: Attribute[];
}

/**
 * This is the AttributeTab component. It is a child component of the Inspector component.
 * @param AttributeTabProps (attributes) - Array of Attribute objects.
 * @constructor
 */

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
