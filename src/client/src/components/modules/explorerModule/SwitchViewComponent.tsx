import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeSplitView } from "../../../redux/store/splitView/actions";
import { VIEW_TYPE } from "../../../models/project";
import {
  LoadState,
  CheckView,
  SaveState,
} from "../../../redux/store/localStorage";
import "./checkboxfooter.scss";

export const SwitchViewComponent = () => {
  const dispatch = useDispatch();
  const isVisible = CheckView(VIEW_TYPE.BLOCKVIEW);
  const [isActive, SetIsActive] = useState(LoadState("splitview"));

  const handleClick = () => {
    SetIsActive(!isActive);
    SaveState(!isActive, "splitview");
    dispatch(changeSplitView(!isActive));
  };
  return (
    <FooterBox visible={isVisible}>
      <FooterContent onClick={handleClick} active={isActive}>
        <label className={"checkbox-footer"}>
          <input type="checkbox" checked={isActive} onChange={handleClick} />
          <span className="checkmark-footer"></span>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SwitchViewComponent;
