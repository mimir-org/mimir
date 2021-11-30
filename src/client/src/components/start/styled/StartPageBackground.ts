import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const StartPageBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${Color.DarkBlue};

  @keyframes slideup {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-240%);
    }
  }

  .slider {
    position: relative;
    animation: slideup 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 1.8s;
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
    margin-left: 280px;
  }
`;

export default StartPageBackground;
