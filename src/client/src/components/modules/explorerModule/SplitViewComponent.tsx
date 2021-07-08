import { RootState } from "../../../redux/store";
import { FooterBox, FooterContent } from "../../../compLibrary/box/footer";
import { TextResources } from "../../../assets/text";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FindSelectedNode, IsLocation } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import {
  setSplitView,
  setSplitNode,
} from "../../../redux/store/splitView/actions";

export const SplitViewComponent = () => {
  const splitView = useSelector<RootState>(
    (state) => state.splitView.visible
  ) as boolean;

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(IsBlockView());
  const [isActive, SetIsActive] = useState(splitView);
  const selectedNode = FindSelectedNode();

  useEffect(() => {
    if (IsLocation(selectedNode)) setIsVisible(false);
    else IsBlockView() && setIsVisible(true);

    if (!selectedNode) {
      SetIsActive(false);
    }
  }, [selectedNode]);

  const onChange = () => {
    if (IsLocation(selectedNode)) return;
    if (isActive) dispatch(setSplitNode(null));
    SetIsActive(!isActive);
    dispatch(setSplitView(!isActive));
  };

  return (
    <FooterBox visible={isVisible}>
      <FooterContent onClick={onChange} active={isActive}>
        <label className={"checkbox"}>
          <input type="checkbox" checked={isActive} onChange={onChange} />
          <span className="checkmark-footer"></span>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
