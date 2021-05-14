import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { useState } from "react";
import "./checkboxfooter.scss";
import { useDispatch } from "react-redux";
import { changeSplitView } from "../../../redux/store/splitView/actions";
import {
  LoadState,
  SaveState,
} from "../../../redux/store/localStorage/localStorage";

export const SwitchViewComponent = () => {
  const dispatch = useDispatch();
  const isVisible = LoadState("blockview");
  const [isActive, SetIsActive] = useState(false);

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
          <label className="checkbox-footer_label"></label>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SwitchViewComponent;
