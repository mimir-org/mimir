import styled from "styled-components";
import { FontWeight } from "../../compLibrary";

const ListElementCategory = styled.div`
  display: flex;
  flex-direction: column;

  .rds-category {
    margin: 0px 7px;
    height: 30px;
    line-height: 30px;
    font-weight: ${FontWeight.Bold};
  }
`;

export default ListElementCategory;
