import { RootState } from "../../../redux/store";
import { FooterBox, FooterContent } from "../../../compLibrary/box/footer";
import { TextResources } from "../../../assets/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSelectedNode, IsLocation } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import { OnChange } from "./handlers";

export const SplitViewComponent = () => {
  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(IsBlockView());
  const [isActive, setIsActive] = useState(splitView);
  const selectedNode = GetSelectedNode();

  useEffect(() => {
    if (IsLocation(selectedNode)) setIsVisible(false);
    else IsBlockView() && setIsVisible(true);

    if (!selectedNode) {
      setIsActive(false);
    }
  }, [selectedNode]);

  return (
    <FooterBox visible={isVisible}>
      <FooterContent
        onClick={() => OnChange(dispatch, isActive, setIsActive, selectedNode)}
        active={isActive}
      >
        <label className={"checkbox"}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() =>
              OnChange(dispatch, isActive, setIsActive, selectedNode)
            }
          />
          <span className="checkmark-footer"></span>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
