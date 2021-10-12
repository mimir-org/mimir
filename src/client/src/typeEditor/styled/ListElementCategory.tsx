import styled from "styled-components";
import { Color, FontWeight } from "../../compLibrary";

interface Props {
  isSelected: boolean;
}

const ListElementCategory = styled.div<Props>`
  display: flex;
  flex-direction: column;

  .rds-category {
    margin: 0px 7px;
    height: 30px;
    line-height: 30px;
    font-weight: ${FontWeight.Bold};
  }

  :nth-child(odd) {
    background-color: ${(props: { background: boolean }) => (props.background === false ? "" : Color.LightPurple)};
  }

  :nth-child(even) {
    background-color: ${(props: { background: boolean }) => (props.background === false ? "" : Color.White)};
  }
`;

export default ListElementCategory;
