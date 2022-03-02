import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../compLibrary/font";

export const RelationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const RelationsHeader = styled.span`
  color: ${Color.GREY_HEADER};
  font-size: ${FontSize.Medium};
`;

interface RelationsTerminalListProps {
  hasItems: boolean;
}

const getBorder = (hasItems: boolean) => (hasItems ? `1px solid ${Color.BLACK}` : "none");

export const RelationsTerminalList = styled.div<RelationsTerminalListProps>`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  border: ${(props) => getBorder(props.hasItems)};
  border-radius: 5px;

  :first-child {
    border: none;
  }

  :last-child {
    border: ${(props) => getBorder(props.hasItems)};
    border-radius: 5px;
  }
`;

interface RelationsTerminalListElementProps {
  color: string;
}

export const RelationsTerminalListElement = styled.div<RelationsTerminalListElementProps>`
  padding: 8px 10px;
  min-width: 250px;
  height: 30px;
  font-size: ${FontSize.Medium};
  display: flex;
  align-items: center;
  background-color: ${(props) => props.color};
  border-bottom: 1px solid ${Color.GREY_DARK};

  .icon {
    display: flex;
    margin-left: auto;
  }

  :hover {
    background-color: ${Color.BLUE_LIGHT};
    cursor: pointer;
    text-decoration: underline;
  }
  :first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  :last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: none;
  }
`;
