import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  width?: number;
}

const TabColumn = styled.div<Props>`
  width: ${(props) => getWidth(props.width)};
  height: 100%;
  padding: 10px;
  padding-left: 20px;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  & > div {
    font-size: ${FontSize.Tiny};
    color: ${Color.GreyHeader};
  }

  & > div > :first-child {
    padding-left: 9px;
    margin-bottom: 4px;
  }

  .statusDropdown {
    width: 125px;
  }
`;

const getWidth = (width: number): string => (width ? `${width}px` : "100%");

export default TabColumn;
