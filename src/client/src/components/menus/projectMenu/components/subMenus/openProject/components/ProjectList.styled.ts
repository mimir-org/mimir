import styled from "styled-components";
import { Color } from "../../../../../../../assets/color/Color";
import { FontSize, FontWeight } from "../../../../../../../assets/font";

export const ProjectListBox = styled.div`
  position: relative;
  max-height: 350px;

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const ProjectListLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${FontWeight.NORMAL};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
  border-bottom: 2px solid ${Color.BASTILLE};
  padding-right: 10px;

  p {
    white-space: nowrap;
    margin-bottom: 2px;
  }

  .name {
    width: 40%;
  }

  .owner {
    padding-left: 4px;
    width: 20%;
  }

  .version {
    text-align: center;
    width: 25%;
  }

  .edited {
    text-align: right;
    width: 15%;
  }
`;

export const ProjectDataContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid ${Color.BASTILLE};
  box-shadow: 0 0, 0 -3px 3px -3px rgba(0, 0, 0, 0.2) inset, 0 0, 0 0;
`;
