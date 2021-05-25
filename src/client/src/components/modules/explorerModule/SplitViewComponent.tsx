import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Node, VIEW_TYPE } from "../../../models/project";
import { RootState } from "../../../redux/store";
import { IsLocationNode } from "../../flow/helpers";
import {
  changeSplitView,
  setSplitViewNode,
} from "../../../redux/store/splitView/actions";
import {
  LoadState,
  CheckView,
  SaveState,
} from "../../../redux/store/localStorage";

export const SplitViewComponent = () => {
  const dispatch = useDispatch();
  const isVisible = CheckView(VIEW_TYPE.BLOCKVIEW);
  const [isActive, SetIsActive] = useState(LoadState("splitview"));
  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isSelected)
  ) as Node;

  useEffect(() => {
    if (!selectedNode) {
      SetIsActive(false);
      SaveState(false, "splitview");
    }
  }, [selectedNode]);

  const handleClick = () => {
    if (IsLocationNode(selectedNode)) return;
    SetIsActive(!isActive);
    SaveState(!isActive, "splitview");
    dispatch(changeSplitView(!isActive));
    dispatch(setSplitViewNode(null));
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
