import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import textResources from "../../textResources";
import { TreeviewIcon, BlockviewIcon } from "../../assets/index";
import styled from "styled-components";

const TreeviewWrapper = styled.div`
  cursor: pointer;
  position: relative;
  bottom: 7px;
`;

const BlockviewWrapper = styled.div`
  cursor: pointer;
  position: relative;
  left: 50px;
  bottom: 7px;
`;

const Header = () => {
  const { push } = useHistory();

  return (
    <AppBar className="appbar">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className="menu_button"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className="title_text"
          onClick={() => push("/")}
        >
          {textResources.MainHeader_App_Name}
        </Typography>

        <BlockviewWrapper>
          <img
            src={BlockviewIcon}
            alt="blockview"
            onClick={() => push("/home/diagram")}
          />
        </BlockviewWrapper>
        <TreeviewWrapper>
          <img
            src={TreeviewIcon}
            alt="treeview"
            onClick={() => push("/home/treeview")}
          />
        </TreeviewWrapper>

        <Button color="inherit" className="login_button">
          {textResources.MainHeader_Login_Heading}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
