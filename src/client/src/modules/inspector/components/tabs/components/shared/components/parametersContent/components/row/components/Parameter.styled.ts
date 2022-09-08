import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

interface ParameterComponentProps {
  color: string;
}

export const ParameterHeader = styled.div<ParameterComponentProps>`
  display: flex;
  gap: 8px;
  height: 30px;
  padding: 8px 6px 8px 20px;
  background-color: ${(props) => props.color};

  span {
    display: flex;
    align-items: center;
    font-size: ${FontSize.MEDIUM};
    font-weight: 500;
    margin-right: auto;

    a {
      display: flex;
      align-items: center;
      font-size: ${FontSize.MEDIUM};
      text-decoration: underline;
      color: ${Color.BLACK};
    }
  }

  .linkIcon {
    margin-left: 7px;
    width: 13px;
    height: 13px;
  }

  .warningIcon {
    margin-left: -10px;
  }
`;
