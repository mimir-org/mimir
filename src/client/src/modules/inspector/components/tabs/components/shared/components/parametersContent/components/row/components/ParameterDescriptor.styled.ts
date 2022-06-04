import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

export const ParameterDescriptorsWrapper = styled.div`
  padding: 8px 35px 8px 20px;

  .descriptors-top {
    display: flex;
    justify-content: space-between;
    font-size: ${FontSize.TINY};
    color: ${Color.DAVYS_GREY};
  }

  .descriptors-bottom {
    display: flex;
    font-size: ${FontSize.SMALL};
    justify-content: space-between;
    margin-top: 1px;
    border-top: 1px solid ${Color.CORNFLOWER_BLUE};

    div:not(:first-child)::after {
      content: "";
      width: 1px;
      height: 6px;
      background: ${Color.CORNFLOWER_BLUE};
      border-radius: 1px;
      position: absolute;
      top: -1.5px;
      left: -3px;
    }
  }

  div > div {
    position: relative;
  }

  div > div:nth-child(odd) {
    width: 55px;
  }

  div > div:nth-child(2) {
    width: 82.5px;
  }
`;
