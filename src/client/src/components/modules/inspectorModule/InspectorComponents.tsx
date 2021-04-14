import {
  RelationsComponent,
  AdminComponent,
  InheritedComponent,
  CommentsComponent,
  ChangelogComponent,
  TechComponent,
} from "./fragments";

const InspectorComponents = () => {
  return (
    <>
      <AdminComponent index={1} />
      <TechComponent index={2} />
      <RelationsComponent index={3} />
      <InheritedComponent index={4} />
      <CommentsComponent index={5} />
      <ChangelogComponent index={6} />
    </>
  );
};

export default InspectorComponents;
