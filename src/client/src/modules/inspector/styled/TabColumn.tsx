import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const TabColumn = styled.div`
  width: ${(props: { width: number }) => getWidth(props.width)};
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
