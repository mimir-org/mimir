import styled from "styled-components";
import { FontSize, Color } from "../../../../../../compLibrary";

const ParameterBox = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  font-size: ${FontSize.Medium};

  .text {
    position: absolute;
    left: 8px;
    top: 15px;
    padding-right: 5px;
  }

  .descriptors {
    padding: 5px 40px 5px 20px;

    .descriptors-top {
      display: flex;
      flex: row;
      font-size: ${FontSize.Tiny};
      color: #4f4f4f;
    }

    .descriptors-bottom {
      display: flex;
      flex: row;
      font-size: ${FontSize.Small};

      div:not(:first-child)::after {
        content: "";
        width: 1px;
        height: 6px;
        background: ${Color.ParamsPurple};
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

    hr {
      margin: 1px;
      border-top: 1px solid ${Color.ParamsPurple};
      border-bottom-width: 0px;
    }
  }

  .inputContainer {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    padding-left: 20px;
    border-color: ${Color.InspectorGreyBorder};

    .parameterInput {
      width: 67px;
      height: 20px;
      font-size: ${FontSize.Small};
      padding: 0px 0px 0px 2px;
    }

    .parameterDropdown {
      width: 68px;
      height: 24px;
      padding-left: 20px;
    }
  }
`;
export default ParameterBox;
