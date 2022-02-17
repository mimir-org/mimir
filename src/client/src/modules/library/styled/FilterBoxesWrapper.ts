import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

export const FilterBoxesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  padding: 15px 0 10px 0;
  background: linear-gradient(to right, ${Color.FunctionMain}, ${Color.ProductMain}, ${Color.LocationMain}) left bottom no-repeat;
  background-size: 100% 2px;
`;
