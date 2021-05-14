import { FooterBox, FooterContent } from "../../../componentLibrary/box/footer";
import { TextResources } from "../../../assets/textResources";
import { LoadState } from "../../../redux/store/localStorage/localStorage";
import { useState } from "react";
import "./checkboxfooter.scss";

export const SwitchViewComponent = () => {
  const isVisible = LoadState("blockview");
  const [isActive, SetIsActive] = useState(false);

  const handleClick = () => {
    SetIsActive(!isActive);
  };
  return (
    <FooterBox visible={isVisible}>
      <FooterContent onClick={handleClick} active={isActive}>
        <label className={"checkbox-footer"}>
          <input type="checkbox" checked={isActive} onChange={() => null} />
          <span className="checkmark-footer"></span>
          <label className="checkbox-footer_label"></label>
        </label>
        <p>{TextResources.Split_view}</p>
      </FooterContent>
    </FooterBox>
  );
};

export default SwitchViewComponent;
