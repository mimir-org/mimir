import styled from "styled-components";
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
    font-size: ${FontSize.MEDIUM};
    font-weight: 500;
    margin-right: auto;
  }

  .warningIcon {
    margin-left: -10px;
  }
`;
