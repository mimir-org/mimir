import { InspectorHeader } from ".";
import { AnimatedMenu } from "./styled/animated";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const InspectorModule = () => {
  const inspectorMaxHeight = "290";
  const inspectorMinHeight = "0";
  const inspectorHiddenHeight = "38";

  const showInspector = useSelector<RootState>(
    (state) => state.showInspectorReducer.visible
  );

  return showInspector ? (
    <>
      <AnimatedMenu start={inspectorMinHeight} stop={inspectorMaxHeight}>
        <InspectorHeader />
      </AnimatedMenu>
    </>
  ) : (
    <>
      <AnimatedMenu start={inspectorMaxHeight} stop={inspectorHiddenHeight}>
        <InspectorHeader />
      </AnimatedMenu>
    </>
  );
};

export default InspectorModule;
