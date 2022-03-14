import styled from "styled-components";
import { Color } from "../../../../../../../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../../../../../../../compLibrary/font";

export const ParameterDescriptorsWrapper = styled.div`
  padding: 8px 35px 8px 20px;

  .descriptors-top {
    display: flex;
    justify-content: space-between;
    font-size: ${FontSize.TINY};
    color: ${Color.GREY_HEADER};
  }

  .descriptors-bottom {
    display: flex;
    font-size: ${FontSize.SMALL};
    justify-content: space-between;
    margin-top: 1px;
    border-top: 1px solid ${Color.PARAMS_PURPLE};

    div:not(:first-child)::after {
      content: "";
      width: 1px;
      height: 6px;
      background: ${Color.PARAMS_PURPLE};
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
