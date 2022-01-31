import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

const InstructionProjectMenu = styled.div`
  .arrow {
    position: absolute;
    top: 72px;
    right: 268px;
    width: 100px;
  }

  .arrow .curve {
    border-top: 0px;
    border-right: 1px solid ${Color.White};
    border-bottom: 1px solid transparent;
    border-left: 0px;
    height: 136px;
    width: 90px;
    border-radius: 0px 0px 150px 15px;
  }

  .arrow .point {
    position: absolute;
    left: 100px;
    top: 12px;
  }

  .arrow .point:before,
  .arrow .point:after {
    border: 0.5px solid ${Color.White};
    height: 8px;
    content: "";
    position: absolute;
  }

  .arrow .point:before {
    top: -13px;
    left: -14px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
  }

  .arrow .point:after {
    top: -13px;
    left: -8px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
  }
`;

export default InstructionProjectMenu;
