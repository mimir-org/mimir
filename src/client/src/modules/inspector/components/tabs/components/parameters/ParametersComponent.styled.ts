import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";
import { FontSize } from "../../../../../../assets/font";

export const ParametersBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

export const ParametersRowBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 150px;
  margin-bottom: 50px;
`;

export const ParametersHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  position: sticky;
  top: 0;
  z-index: 5;

  background-color: ${Color.CULTURED};
  border-bottom: 1px solid ${Color.GAINSBORO};
`;

export const ParametersMenu = styled.div`
  display: flex;
  gap: 15px;
  align-content: center;
  max-width: 550px;

  .link {
    font-size: ${FontSize.MEDIUM};
    text-decoration: underline;
    cursor: pointer;
  }

  .hide-link {
    cursor: default;
    visibility: hidden;
  }
`;