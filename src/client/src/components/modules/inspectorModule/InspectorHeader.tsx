import { FragmentContent, RelationsContent } from "./fragments";

const InspectorHeader = () => {
  return (
    <>
      <FragmentContent index={0} />
      <FragmentContent index={1} />
      <FragmentContent index={2} />
      <RelationsContent index={3} />
      <FragmentContent index={4} />
      <FragmentContent index={5} />
      <FragmentContent index={6} />
    </>
  );
};

export default InspectorHeader;
