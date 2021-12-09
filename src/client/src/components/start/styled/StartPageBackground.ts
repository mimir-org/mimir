import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const StartPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${Color.BlueDark};

  @keyframes slideup {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-225%);
    }
  }

  .slider {
    position: relative;
    animation: slideup 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }

  .logo {
    width: 380px;
    height: 100px;
  }

  .version-text {
    color: ${Color.White};
    font-family: ${FontType.Standard};
    font-size: ${FontSize.SubHeader};
    text-align: right;
    padding-right: 14px;
    width: 100%;
  }
`;

export default StartPageBackground;
