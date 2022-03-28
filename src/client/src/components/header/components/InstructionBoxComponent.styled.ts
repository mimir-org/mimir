import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../compLibrary/font";

export const InstructionProjectMenu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 6;
`;

export const InstructionArrowContainer = styled.div`
  position: relative;
  width: fit-content;
`;

export const InstructionArrowCurve = styled.div`
  border-right: 1px solid ${Color.WHITE};
  border-bottom: 1px solid transparent;
  height: 136px;
  width: 90px;
  border-radius: 0 0 150px 15px;
`;

export const InstructionArrowPoint = styled.div`
  position: absolute;
  left: 100px;
  top: 12px;

  :before,
  :after {
    border: 0.5px solid ${Color.WHITE};
    height: 8px;
    content: "";
    position: absolute;
  }

  :before {
    top: -13px;
    left: -14px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
  }

  :after {
    top: -13px;
    left: -8px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
  }
`;

export const InstructionTextBox = styled.div`
  margin-top: -25px;
  margin-right: -50px;
  width: 235px;
  background-color: ${Color.MIDNIGHT_EXPRESS};
  border: ${Color.WHITE} solid 1px;
  border-radius: 5px;
`;

export const InstructionText = styled.p`
  color: ${Color.WHITE};
  font-family: ${FontType.STANDARD};
  font-size: ${FontSize.HEADER};
  padding: 18px;
  margin: 0;
`;
