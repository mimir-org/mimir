import { AspectObject } from "../../../../lib";
import { Flexbox, Form, Input, Text, useMimirorgTheme } from "@mimirorg/component-library";
import { TextArea } from "../../../../compLibrary/input/text";
import { TabContainerWrapper } from "./TabContainerWrapper.styled";

interface AdminTabProps {
  aspectObject: AspectObject;
}
export const AdminTab = ({ aspectObject }: AdminTabProps) => {
  const theme = useMimirorgTheme();

  return (
    <TabContainerWrapper>
      <Form>
        <Flexbox flexDirection={"row"} gap={theme.spacing.xl}>
          <div>
            <Text variant={"body-small"}>ID</Text>
            <Input disabled defaultValue={aspectObject?.id} type={"text"} />
            <Text variant={"body-small"}>RDS</Text>
            <Input disabled defaultValue={aspectObject?.rds} type={"text"} />
          </div>
          <div>
            <Text variant={"body-small"}>Last updated</Text>
            <Input disabled defaultValue={aspectObject?.updated?.toLocaleDateString()} type={"text"} />
            <Text variant={"body-small"}>Updated by</Text>
            <Input disabled defaultValue={aspectObject?.updatedBy} type={"text"} />
            <Text variant={"body-small"}>Date created</Text>
            <Input disabled defaultValue={aspectObject?.created?.toLocaleDateString()} type={"text"} />
          </div>
          <div>
            <Text variant={"body-small"}>Description</Text>
            <TextArea height={120} defaultValue={aspectObject?.description} />
          </div>
        </Flexbox>
      </Form>
    </TabContainerWrapper>
  );
};
