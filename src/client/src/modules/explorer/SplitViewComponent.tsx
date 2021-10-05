import { RootState } from "../../redux/store";
import { FooterBox, FooterContent } from "../../compLibrary/box/footer";
import { TextResources } from "../../assets/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IsBlockView } from "../../components/flow/block/helpers";
import { OnChange } from "./handlers";
import { GetSelectedNode, IsLocation } from "../../components/flow/helpers";

export const SplitViewComponent = () => {
  const dispatch = useDispatch();
  const splitView = useSelector<RootState>((state) => state.splitView.visible) as boolean;
  const [visible, setIsVisible] = useState(IsBlockView());
  const [active, setIsActive] = useState(splitView);
  const selectedNode = GetSelectedNode();

  useEffect(() => {
    if (IsLocation(selectedNode)) setIsVisible(false);
    else IsBlockView() && setIsVisible(true);

    if (!selectedNode) setIsActive(false);
  }, [selectedNode]);

  return (
    <FooterBox visible={visible}>
      <FooterContent active={active}>
        <label className={"checkbox"}>
          <input
            type="checkbox"
            checked={active}
            onChange={() => OnChange(dispatch, active, setIsActive, selectedNode)}
          />
          <span className="checkmark-footer"></span>
        </label>
        <div onClick={() => OnChange(dispatch, active, setIsActive, selectedNode)}>{TextResources.Split_view}</div>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
