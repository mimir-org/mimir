import styled from "styled-components";

const TabHeader = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-top-left-radius: 6px;
  font-family: roboto;
  color: #000;
  border-right: 1px solid #cbcbcb;
  height: ${(props: { active: string }) => (props.active ? "36px" : "32px")};

  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "4px")};

  border-left: ${(props: { active: string }) =>
    props.active ? "1px solid #cbcbcb" : "1px solid #cbcbcb"};

  border-top: ${(props: { active: string }) =>
    props.active ? "0px solid #cbcbcb" : "0px solid #cbcbcb"};

  border-bottom: ${(props: { active: string }) =>
    props.active ? "none !important" : "1px solid #cbcbcb"};

  background-color: ${(props: { active: string }) =>
    props.active ? "#f2f2f2" : "#c4c4c4"};

  padding: ${(props: { active: string }) =>
    props.active ? "12px 20px 0px 20px;" : "8px 20px 0px 20px"};

  text-decoration: ${(props: { active: string }) =>
    props.active ? "underline" : "none"};

  font-weight: ${(props: { active: string }) =>
    props.active ? "bold" : "none"};

  &: hover {
    cursor: pointer;
  }
`;

export default TabHeader;
