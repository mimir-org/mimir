import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
interface Props {
  isHeader: boolean;
  isSubHeader: boolean;
  indent: number;
}

const ElementBox = styled.label<Props>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  margin-top: ${(props) => (props.isHeader || props.isSubHeader) && "7px"};
  padding-left: ${(props) => props.indent * 8}px;
  background-color: ${(props) => (props.isHeader ? Color.GreyLight : Color.White)};

  &:hover {
    cursor: pointer;
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default ElementBox;
