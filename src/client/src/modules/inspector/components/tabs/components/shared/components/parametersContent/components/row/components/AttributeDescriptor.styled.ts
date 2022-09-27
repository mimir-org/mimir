import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

interface Props {
  headerColor: string;
  bodyColor: string;
}

export const AttributesDescriptorsWrapper = styled.div<Props>`
  padding: 12px 35px 8px 12px;

  .tjof {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  .gabbi {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #65a8ad;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height: 27px;
    min-width: 200px;
    max-width: 250px;
    background-color: ${(props) => props.headerColor};
    color: ${Color.WHITE};
    font-size: ${FontSize.MEDIUM};
    padding: 4px;
    margin-right: 7px;
  }

  .gabbi-bottom {
    display: flex;
    border: 1px solid ${(props) => props.headerColor};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 23px;
    min-width: 200px;
    max-width: 250px;
    color: ${Color.BLACK};
    font-size: ${FontSize.MEDIUM};
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-right: 7px;
  }

  .descriptors-top {
    display: flex;
    justify-content: space-between;
  }

  .descriptors-bottom {
    display: flex;
    font-size: ${FontSize.SMALL};
    justify-content: space-between;
  }

  div > div {
    position: relative;
  }

  div > div:nth-child(odd) {
    width: 55px;
  }

  div > div:nth-child(2) {
    width: 82.5px;
  }
`;
