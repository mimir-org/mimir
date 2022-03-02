import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../compLibrary/font";

export const UserMenuBox = styled.div`
  position: absolute;
  right: 0;
  background: ${Color.WHITE};
  width: 250px;
  border-style: solid;
  border-color: ${Color.BLUE_MAGENTA};
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  z-index: 6;
`;

export const UserNameBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 15px;
  margin-bottom: 15px;
`;

export const UserNameText = styled.p`
  margin: 0;
  font-size: ${FontSize.SubHeader};
  font-weight: ${FontWeight.Bold};
`;

export const UserNameRoleText = styled.p`
  margin: 0;
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.Normal};
  color: ${Color.GREY_INACTIVE};
`;

export const UserMenuElement = styled.button`
  display: flex;
  gap: 10px;
  background: transparent;
  border: 0;
  width: 100%;
  padding: 10px 15px;
  color: ${Color.BLUE_MAGENTA};
  cursor: pointer;
  text-align: left;

  :hover {
    background-color: ${Color.BLUE_LIGHT};
  }

  & + & {
    margin-top: 10px;
    border-top: 1px solid ${Color.GREY};
    border-radius: 0 0 10px 10px;
  }
`;

export const UserMenuElementText = styled.span`
  font-size: ${FontSize.Standard};

  :hover {
    text-decoration: underline;
  }
`;
