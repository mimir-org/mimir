import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
interface Props {
  isHeader: boolean;
  isSubHeader: boolean;
  indent: number;
}

const ElementBox = styled.div<Props>`
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: ${(props) => (props.isHeader || props.isSubHeader) && "7px"};
  padding-left: ${(props) => props.indent * 12}px;
  background-color: ${(props) => (props.isHeader ? Color.GreyLight : Color.White)};

  &:hover {
    cursor: pointer;
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default ElementBox;
