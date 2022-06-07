import styled from "styled-components";
import { Color } from "../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../assets/font";

interface Props {
  width?: number;
}

export const TabColumn = styled.div<Props>`
  width: ${(props) => getWidth(props.width)};
  font-size: ${FontSize.MEDIUM};
  display: flex;
  gap: 10px;
  flex-direction: column;

  & > div {
    font-size: ${FontSize.TINY};
    color: ${Color.DAVYS_GREY};
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
