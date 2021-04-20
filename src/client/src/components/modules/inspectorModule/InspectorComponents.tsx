import { GetNodes } from "../../flow/helpers";
import {
  AdminComponent,
  TechComponent,
  RelationsComponent,
} from "./components";

const InspectorComponents = () => {
  const nodes = GetNodes();
  //   const activeNode = nodes.find((node) => node.isSelected).id;

  return (
    <>
      <AdminComponent index={0} />
      {/* <TechComponent index={1} />
      <RelationsComponent index={2} /> */}
    </>
  );
};

export default InspectorComponents;
