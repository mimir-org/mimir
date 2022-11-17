import styled from "styled-components";
import { Color } from "../../../../../../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../../../../../../assets/font";

interface AttributeObjectBoxProps {
  disabled: boolean;
}

export const AttributeObjectBox = styled.div<AttributeObjectBoxProps>`
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  display: flex;
  flex-direction: column;
  width: 330px;
  border: 1px solid ${Color.LIGHT_SILVER};
  margin: 10px;
`;

export const AttributeObjectBody = styled.div`
  display: flex;
`;

interface AttributeHeaderBoxProps {
  color: string;
}

export const AttributeHeaderBox = styled.div<AttributeHeaderBoxProps>`
  display: flex;
  gap: 8px;
  height: 30px;
  padding: 8px 6px 8px 20px;
  background-color: ${(props) => props.color};

  span {
    display: flex;
    align-items: center;
    font-size: ${FontSize.MEDIUM};
    font-weight: 500;
    margin-right: auto;

    a {
      display: flex;
      align-items: center;
      font-size: ${FontSize.MEDIUM};
      text-decoration: underline;
      color: ${Color.BLACK};
    }
  }

  .linkIcon {
    margin-left: 7px;
    width: 13px;
    height: 13px;
  }

  .warningIcon {
    margin-left: -10px;
  }
`;
