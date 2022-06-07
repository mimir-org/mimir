import styled from "styled-components";
import { Color } from "../../../assets/color/Color";

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${Color.BLACK};
  position: relative;
  max-height: 20px;
`;

export const DropdownHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 90px;
  border: 1px solid ${Color.BASTILLE};
  border-radius: 5px;
  padding: 0 5px;
  font-size: 11px;
  background-color: ${Color.WHITE} !important;

  p {
    margin: 0;
  }

  .icon {
    margin-left: auto;
    width: 10px;
    height: 6px;
  }
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.WHITE};
  border: 1px solid ${Color.BASTILLE};
  border-radius: 5px;
  padding: 1px;
  font-size: 11px;
  position: absolute;
  top: 23px;
  left: 0;
  max-height: 60px;
  width: 90px;
  z-index: 1;

  .dropdown_listitem {
    border-bottom: 1px solid ${Color.LIGHT_SILVER};
    background-color: ${Color.WHITE};
    padding: 2px 5px;

    &:last-child {
      border-bottom: 0;
    }
  }

  .dropdown_listitem:hover {
    background-color: ${Color.ONAHAU};
    text-decoration: underline;
    cursor: pointer;
  }
`;
