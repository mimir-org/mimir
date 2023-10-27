import { Block } from "../../../../lib";
import { Button, Divider, Flexbox, Form, Input, Text, useMimirorgTheme } from "@mimirorg/component-library";
import { TextArea } from "../../../../compLibrary/input/text";
import { TabContainerWrapper } from "./TabContainerWrapper.styled";
import { useState } from "react";
import { projectStateSelector, useAppSelector } from "../../../../store";
import { ProjectState, updateProject } from "../../../../store/reducers/projectReducer";
import { useDispatch } from "react-redux";
import { TextResources } from "../../../../assets/text/TextResources";

interface AdminTabProps {
  aspectObject: Block;
}
export const AdminTab = ({ aspectObject }: AdminTabProps) => {
  const [labelValue, setLabelValue] = useState<string>(aspectObject?.label);
  const [descriptionValue, setDescriptionValue] = useState<string>(aspectObject?.description);
  const theme = useMimirorgTheme();
  const dispatch = useDispatch();
  const projectState = useAppSelector<ProjectState>(projectStateSelector);

  const onSubmit = () => {
    aspectObject.label = labelValue;
    aspectObject.description = descriptionValue;
    dispatch(updateProject({ ...projectState }));
  };

  return (
    <TabContainerWrapper>
      <Form>
        <Flexbox flexDirection={"row"} gap={theme.spacing.xl}>
          <Flexbox flexDirection={"column"} gap={theme.spacing.l}>
            <span>
              <Text variant={"body-small"}>ID</Text>
              <Text variant={"body-small"}>{aspectObject?.id}</Text>
            </span>
            <span>
              <Text variant={"body-small"}>RDS</Text>
              <Text variant={"body-small"}>{aspectObject?.rds}</Text>
            </span>
            <span>
              <Text variant={"body-small"}>Date created</Text>
              <Text variant={"body-small"}>{aspectObject?.created?.toLocaleDateString()}</Text>
            </span>
            {aspectObject?.updated && (
              <span>
                <Text variant={"body-medium"}>Last updated</Text>
                <Text variant={"body-small"}>{aspectObject?.updated?.toLocaleDateString()}</Text>
                <Divider />
              </span>
            )}
            {aspectObject?.updatedBy && (
              <span>
                <Text variant={"body-small"}>Updated by</Text>
                <Text variant={"body-small"}>{aspectObject?.updatedBy}</Text>
                <Divider />
              </span>
            )}
          </Flexbox>
          <span>
            <Text variant={"body-small"}>Label</Text>
            <Input defaultValue={aspectObject?.label} onChange={(e) => setLabelValue(e.target.value)} />
            <Text variant={"body-small"}>Description</Text>
            <TextArea
              height={120}
              defaultValue={aspectObject?.description}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
          </span>
          {aspectObject?.label !== labelValue || aspectObject?.description !== descriptionValue ? (
            <Flexbox flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
              <Button variant={"outlined"} onClick={onSubmit}>
                {TextResources.SAVE}
              </Button>
            </Flexbox>
          ) : null}
        </Flexbox>
      </Form>
    </TabContainerWrapper>
  );
};
