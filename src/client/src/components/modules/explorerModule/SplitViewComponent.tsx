import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Node } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { IsLocationNode } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import {
  setSplitNode,
  setSplitView,
} from "../../../redux/store/splitView/actions";

export const SplitViewComponent = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(IsBlockView());
  const [isActive, SetIsActive] = useState(false);
  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isSelected)
  ) as Node;

  useEffect(() => {
    if (IsLocationNode(selectedNode)) setIsVisible(false);
    else IsBlockView() && setIsVisible(true);

    if (!selectedNode) {
      SetIsActive(false);
    }
  }, [selectedNode]);

  const handleClick = () => {
    if (IsLocationNode(selectedNode)) return;
    if (isActive) dispatch(setSplitNode(null));
    SetIsActive(!isActive);
    dispatch(setSplitView(!isActive));
  };

  return (
    <FooterBox visible={isVisible}>
      <FooterContent onClick={handleClick} active={isActive}>
        <label className={"checkbox"}>
          <input type="checkbox" checked={isActive} onChange={handleClick} />
          <span className="checkmark-footer"></span>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
