import styled from "styled-components";
import PropTypes from "prop-types";

const Option = styled.div`
  max-height: 16px;
  padding: 2px 0px 2px 4px;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-color: #cbcbcb;
  background-color: white;

  &:hover {
    background-color: #bde6fd;
    text-decoration: underline;
    cursor: pointer;
  }
`;

Option.propTypes = {
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundColorHover: PropTypes.string,
};

export default Option;
