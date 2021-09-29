import { TerminalsBody, TerminalsWrapper } from "./styled";

interface Props {
  node: Node;
}

const TerminalsComponent = ({ node }: Props) => {
  return (
    <TerminalsBody>
      <TerminalsWrapper></TerminalsWrapper>
    </TerminalsBody>
  );
};

export default TerminalsComponent;
