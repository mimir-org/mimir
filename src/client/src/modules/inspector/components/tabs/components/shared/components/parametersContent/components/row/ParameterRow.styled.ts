import styled from "styled-components";
import { Color } from "../../../../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../../../../compLibrary/font";

interface BodyProps {
  width: number;
}

export const Body = styled.div<BodyProps>`
  display: flex;
  border-bottom: 1px solid ${Color.GREY_DARK};
  width: max(100%, ${(props) => props.width}px);
  min-height: 120px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 71px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 20px;
  font-size: ${FontSize.Small};

  .text {
    display: flex;
    align-items: center;
    position: relative;
    top: -13px;
    margin: 0 auto 0 10px;
    width: 125px;
    height: 33px;
  }

  .icon {
    display: flex;
  }

  svg {
    margin-left: auto;
    width: 30px;

    :hover {
      cursor: pointer;
    }
  }

  .hide-icon {
    visibility: hidden;
    svg:hover {
      cursor: default;
    }
  }
`;
