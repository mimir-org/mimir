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
  const [visible, setVisible] = useState(IsBlockView());
  const [active, setActive] = useState(splitView);
  const selectedNode = GetSelectedNode();

  useEffect(() => {
    if (IsLocation(selectedNode)) setVisible(false);
    else IsBlockView() && setVisible(true);

    if (!selectedNode) setActive(false);
  }, [selectedNode]);

  return (
    <FooterBox visible={visible}>
      <FooterContent active={active}>
        <label className={"checkbox"}>
          <input type="checkbox" checked={active} onChange={() => OnChange(dispatch, active, setActive, selectedNode)} />
          <span className="checkmark-footer"></span>
        </label>
        <div onClick={() => OnChange(dispatch, active, setActive, selectedNode)}>{TextResources.Split_View}</div>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
