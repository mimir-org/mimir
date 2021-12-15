import styled from "styled-components";
import { FontSize } from "../../../../../../compLibrary/font";

interface Props {
  color: string;
}

const ParameterHeader = styled.div<Props>`
  display: flex;
  gap: 8px;
  height: 30px;
  padding: 8px 6px 8px 20px;
  background-color: ${(props) => props.color};

  span {
    font-size: ${FontSize.Medium};
    font-weight: 500;
    margin-right: auto;
  }

  .warningIcon {
    margin-left: -10px;
  }
`;

export default ParameterHeader;
