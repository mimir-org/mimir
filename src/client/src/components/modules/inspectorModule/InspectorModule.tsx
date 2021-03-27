import { InspectorHeader } from ".";
import { AnimatedMenu } from "./styled/animated";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const InspectorModule = () => {
  const showInspector = useSelector<RootState>(
    (state) => state.showInspectorReducer.visible
  );

  const startHeight = showInspector ? "0" : "290";
  const stopHeight = showInspector ? "290" : "38";

  return (
    <>
      <AnimatedMenu start={startHeight} stop={stopHeight}>
        <InspectorHeader />
      </AnimatedMenu>
    </>
  );
};

export default InspectorModule;
