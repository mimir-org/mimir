import styled from "styled-components";
import { Color } from "../../compLibrary/colors";
import { FontSize, FontWeight } from "../../compLibrary/font";

export const MessageBox = styled.div`
  position: absolute;
  top: 40%;
  left: 41%;
  width: 230px;
  height: 160px;
  background-color: ${Color.White};
  border: 2px solid ${Color.BlueMagenta};
  border-radius: 5px;
  font-weight: ${FontWeight.Normal};
  font-size: ${FontSize.SubHeader};
  padding: 10px;
  line-height: 1.5;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  z-index: 6;
`;

export const MessageText = styled.p`
  text-align: center;
`;

export const MessageImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
`;
