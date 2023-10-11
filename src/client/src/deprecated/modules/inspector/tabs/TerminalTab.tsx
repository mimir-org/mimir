import { TabContainerWrapper } from "./TabContainerWrapper.styled";

interface TerminalTabProps {
  name: string;
  id: string;
  description: string;
}

export const TerminalTab = ({ name, id, description }: TerminalTabProps) => {
  return (
    <TabContainerWrapper>
      {name}
      {id}
      {description}
      <p>Here is some demo content</p>
      <p>Here is some demo content</p>
    </TabContainerWrapper>
  );
};
