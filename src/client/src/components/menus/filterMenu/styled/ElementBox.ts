import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
interface Props {
  isHeader: boolean;
}

const ElementBox = styled.div<Props>`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  margin-top: ${(props) => props.isHeader && "12px"};
  height: 30px;
  background-color: ${(props) => (props.isHeader ? Color.GreyLight : Color.White)};

  &:hover {
    cursor: pointer;
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default ElementBox;
