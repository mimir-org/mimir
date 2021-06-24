import { FooterBox, FooterContent } from "../../../compLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FindSelectedNode, IsLocation } from "../../flow/helpers/common";
import { IsBlockView } from "../../flow/helpers/block";
import { setSplitView, setNode } from "../../../redux/store/splitView/actions";

export const SplitViewComponent = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(IsBlockView());
  const [isActive, SetIsActive] = useState(false);
  const selectedNode = FindSelectedNode();

  useEffect(() => {
    if (IsLocation(selectedNode)) setIsVisible(false);
    else IsBlockView() && setIsVisible(true);

    if (!selectedNode) {
      SetIsActive(false);
    }
  }, [selectedNode]);

  const handleClick = () => {
    if (IsLocation(selectedNode)) return;
    if (isActive) dispatch(setNode(null));
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
