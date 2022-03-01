import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../../compLibrary/font";

export const ParametersContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

export const ParametersRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-bottom: 150px;
  margin-bottom: 50px;
`;

export const ParametersContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  position: sticky;
  top: 0;
  z-index: 5;

  background-color: ${Color.GreyInspector};
  border-bottom: 1px solid ${Color.Grey};
`;

export const ParametersContentMenu = styled.div`
  display: flex;
  gap: 15px;
  align-content: center;
  max-width: 550px;

  .link {
    font-size: ${FontSize.Medium};
    text-decoration: underline;
    cursor: pointer;
  }

  .hide-link {
    cursor: default;
    visibility: hidden;
  }
`;
