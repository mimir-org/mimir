import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ObjectBlock } from "./ObjectBlock";
import { PreviewArea, InfoWrapper } from "../styled";
import { InterfaceIcon, TransportIcon } from "../../../../assets/icons/common";

export const PreviewBody = () => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  return (
    <PreviewArea>
      {state.aspect !== "NotSet" && state.objectType === "Object Block" && (
        <ObjectBlock />
      )}
      {state.objectType !== "Object Block" ? (
        <InfoWrapper>
          <p>{/* TODO: selected RDS */}</p>
          <p>{state.typeName}</p>
        </InfoWrapper>
      ) : null}
      {state.aspect === "Function" && state.objectType === "Transport" ? (
        <img src={TransportIcon} className="object-icon" alt="transport-icon" />
      ) : state.aspect === "Function" && state.objectType === "Interface" ? (
        <img src={InterfaceIcon} className="object-icon" alt="interface-icon" />
      ) : null}
    </PreviewArea>
  );
};

export default PreviewBody;
