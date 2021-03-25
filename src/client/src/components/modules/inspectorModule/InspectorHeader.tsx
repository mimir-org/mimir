import { FragmentContent } from "./fragments";
import { FragmentHeaderWrapper } from "./fragments/styled";
import ToggleBox from "./ToggleBox";

const InspectorHeader = () => {
  return (
    <FragmentHeaderWrapper>
      <FragmentContent index={0} />
      <FragmentContent index={1} />
      <FragmentContent index={2} />
      <FragmentContent index={3} />
      <FragmentContent index={4} />
      <ToggleBox />
    </FragmentHeaderWrapper>
  );
};

export default InspectorHeader;
