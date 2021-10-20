import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FooterBox, FooterContent } from "../../compLibrary/box/footer";
import { TextResources } from "../../assets/text";
import { useEffect, useState } from "react";
import { IsBlockView } from "../../components/flow/block/helpers";
import { OnChange } from "./handlers";
import { GetSelectedNode, IsLocation } from "../../components/flow/helpers";
import { Node } from "../../models";

export const SplitViewComponent = () => {
  const dispatch = useAppDispatch();
  const splitView = useAppSelector((s) => s.splitView.visible);
  const splitNode = useAppSelector((s) => s.splitView.node) as Node;
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
        <div onClick={() => OnChange(dispatch, active, setActive, selectedNode, splitNode)}>
          {TextResources.Split_View}
        </div>
      </FooterContent>
    </FooterBox>
  );
};

export default SplitViewComponent;
