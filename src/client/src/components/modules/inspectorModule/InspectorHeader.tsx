import { FragmentContent, RelationsContent, AdminContent } from "./fragments";

const InspectorHeader = () => {
  return (
    <>
      <FragmentContent index={0} />
      <AdminContent index={1} />
      <FragmentContent index={2} />
      <RelationsContent index={3} />
      <FragmentContent index={4} />
      <FragmentContent index={5} />
      <FragmentContent index={6} />
    </>
  );
};

export default InspectorHeader;
