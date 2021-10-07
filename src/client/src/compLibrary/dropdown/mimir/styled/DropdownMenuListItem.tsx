import styled from "styled-components";
import { Color } from "../../../";

const DropdownMenuListItem = styled.div`
  display: flex;
  height: ${(props: { height: number }) => props.height}px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${(props: { borderColor: string }) => props.borderColor};
  font-size: ${(props: { fontSize: string }) => props.fontSize};
  border-radius: ${(props: { borderRadius: number }) => props.borderRadius};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px;
    margin-left: ${(props) => props.hasCategory && "10px"};
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.LightBlue};

    p {
      text-decoration: underline;
    }
  }
`;

export default DropdownMenuListItem;
