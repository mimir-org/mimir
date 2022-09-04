import styled from "styled-components";
import { FontSize } from "../../../../../../../../../../../assets/font";

interface ParameterHeaderProps {
  color: string;
}

export const ParameterHeader = styled.div<ParameterHeaderProps>`
  display: flex;
  gap: 8px;
  height: 30px;
  padding: 8px 6px 8px 20px;
  background-color: ${(props) => props.color};

  span {
    font-size: ${FontSize.MEDIUM};
    font-weight: 500;
    margin-right: auto;
  }

  .warningIcon {
    margin-left: -10px;
  }
`;

export const ParameterInputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 10px 35px 0 20px;

  input {
    flex: 1;
    height: 100%;
    width: 0;
  }
`;
