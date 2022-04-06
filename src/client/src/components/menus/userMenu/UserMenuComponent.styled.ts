import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontWeight } from "../../../compLibrary/font";

export const Box = styled.div`
  position: absolute;
  right: 0;
  background: ${Color.WHITE};
  width: 250px;
  border-style: solid;
  border-color: ${Color.BASTILLE};
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
  font-size: ${FontSize.SUBHEADER};
  font-weight: ${FontWeight.BOLD};
`;

export const UserNameRoleText = styled.p`
  margin: 0;
  font-size: ${FontSize.MEDIUM};
  font-weight: ${FontWeight.NORMAL};
  color: ${Color.BATTLESHIP_GREY};
`;

export const Element = styled.button`
  display: flex;
  gap: 10px;
  background: transparent;
  border: 0;
  width: 100%;
  padding: 10px 15px;
  color: ${Color.BASTILLE};
  cursor: pointer;
  text-align: left;

  :hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
  }

  & + & {
    margin-top: 10px;
    border-top: 1px solid ${Color.GAINSBORO};
    border-radius: 0 0 10px 10px;
  }
`;

export const Text = styled.span`
  font-size: ${FontSize.STANDARD};

  :hover {
    text-decoration: underline;
  }
`;
