import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

export const DropdownMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 15%;
  margin-right: 25px;
  background-color: ${Color.White};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  position: relative;

  .dropdown-label {
    margin-bottom: 7px;
  }
`;

export const DropdownMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 27px;
  background: ${Color.White};
  border: 1.5px solid ${Color.Black};
  border-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  padding: 5px 10px;
`;

export const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 52px;
  left: 0;
  z-index: 1;
  width: 99%;
  max-height: 250px;
  overflow-y: auto;

  .listitem {
    background-color: white;
    display: flex;
    flex-direction: column;
  }
`;

export const DropdownMenuListItem = styled.div`
  display: flex;
  max-height: 31px;
  align-items: center;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${Color.GreyDark};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 10px;
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.BlueLight};
    p {
      text-decoration: underline;
    }
  }
`;
