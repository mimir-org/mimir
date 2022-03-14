import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

export const FilterBoxesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 80px;
  padding: 15px 0 10px 0;
  background: linear-gradient(to right, ${Color.BlueMagenta}, ${Color.FunctionMain}, ${Color.ProductMain}, ${Color.LocationMain})
    left bottom no-repeat;
  background-size: 100% 2px;
`;

export const FilterBoxButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: transparent;
  border: 0;
  padding: 0;

  :hover {
    cursor: pointer;
  }
`;
