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
        <Button
          color="inherit"
          className="login_button"
          onClick={() => push("/home/diagram")}
        >
          {textResources.MainHeader_Diagram_Heading}
        </Button>
        <Button
          color="inherit"
          className="login_button"
          onClick={() => push("/home/treeview")}
        >
          {textResources.MainHeader_Treeview_Heading}
        </Button>
        <Button color="inherit" className="login_button">
          {textResources.MainHeader_Login_Heading}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
