import styled from "styled-components";

const LegendIcons = styled.div`
  display: inline-flex;
  align-items: flex-end;
  padding-top: ${(props: { open: boolean }) => props.open && 6}px;
  position: ${(props: { open: boolean }) => !props.open && "relative"};

  .text {
    right: 5px;
    opacity: 1 !important;
    bottom: ${(props: { open: boolean }) => !props.open && "23px"};
  }

  .icon {
    position: relative;
    right: 7px;
    bottom: ${(props: { open: boolean }) => (props.open ? 35 : 40)}px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default LegendIcons;
