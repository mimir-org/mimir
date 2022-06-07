import styled from "styled-components";
import { Color } from "../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../assets/font";

export const MenuWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${Color.WHITE};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
`;

export const MenuHeader = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  width: 100%;
  margin: 0;
  padding: 0;
  background: ${Color.WHITE};
  border: 1px solid ${Color.BLACK};
  border-radius: 5px;
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};

  img {
    margin-right: 4px;
    padding: 5px;
  }

  .searchText {
    margin: 0;
    padding: 2px 10px;
    opacity: 0.5;
    font-style: italic;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.BLACK};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 34px;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
`;

export const MenuListItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  height: 30px;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${Color.LIGHT_SILVER};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
  cursor: pointer;
  z-index: 1;

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    span {
      text-decoration: underline;
    }
  }
`;
