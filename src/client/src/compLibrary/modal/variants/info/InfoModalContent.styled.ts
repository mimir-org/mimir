import styled from "styled-components";
import { Color } from "../../../colors/Color";
import { FontSize } from "../../../font";

interface InfoModalContentContainerProps {
  title?: string;
  description?: string;
  inset?: string;
  color?: string;
}

export const InfoModalContentContainer = styled.div<InfoModalContentContainerProps>`
  position: relative;
  inset: ${(props) => props.inset};
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 350px;
  min-width: min(500px, 100%);
  max-width: 100%;
  border: 2px solid ${(props) => props.color ?? Color.BASTILLE};
  background-color: ${Color.WHITE};
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  padding: 30px;
`;

export const InfoModalHeader = styled.header`
  margin-bottom: 10px;
  img {
    margin: 0px 10px -5px 0px;
  }
`;

export const InfoModalHeaderTitle = styled.h1`
  font-weight: bold;
  font-size: ${FontSize.HEADER};
  margin: 0;
`;

export const InfoModalHeaderDescription = styled.p`
  margin: 0;
`;
