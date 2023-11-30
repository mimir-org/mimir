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
  block: Block;
}
export const AdminTab = ({ block }: AdminTabProps) => {
  const [labelValue, setLabelValue] = useState<string>(block?.label);
  const [descriptionValue, setDescriptionValue] = useState<string>(block?.description);
  const theme = useMimirorgTheme();
  const dispatch = useDispatch();
  const projectState = useAppSelector<ProjectState>(projectStateSelector);

  const onSubmit = () => {
    block.label = labelValue;
    block.description = descriptionValue;
    dispatch(updateProject({ ...projectState }));
  };

  return (
    <TabContainerWrapper>
      <Form>
        <Flexbox flexDirection={"row"} gap={theme.spacing.xl}>
          <Flexbox flexDirection={"column"} gap={theme.spacing.l}>
            <span>
              <Text variant={"body-small"}>ID</Text>
              <Text variant={"body-small"}>{block?.id}</Text>
            </span>
            <span>
              <Text variant={"body-small"}>RDS</Text>
              <Text variant={"body-small"}>{block?.rds}</Text>
            </span>
            <span>
              <Text variant={"body-small"}>Date created</Text>
              <Text variant={"body-small"}>{block?.created?.toLocaleDateString()}</Text>
            </span>
            {block?.updated && (
              <span>
                <Text variant={"body-medium"}>Last updated</Text>
                <Text variant={"body-small"}>{block?.updated?.toLocaleDateString()}</Text>
                <Divider />
              </span>
            )}
            {block?.updatedBy && (
              <span>
                <Text variant={"body-small"}>Updated by</Text>
                <Text variant={"body-small"}>{block?.updatedBy}</Text>
                <Divider />
              </span>
            )}
          </Flexbox>
          <span>
            <Text variant={"body-small"}>Label</Text>
            <Input defaultValue={block?.label} onChange={(e) => setLabelValue(e.target.value)} />
            <Text variant={"body-small"}>Description</Text>
            <TextArea height={120} defaultValue={block?.description} onChange={(e) => setDescriptionValue(e.target.value)} />
          </span>
          {block?.label !== labelValue || block?.description !== descriptionValue ? (
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
