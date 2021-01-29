import { Component } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {

    render() {
        return (
            <AppBar className="appbar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className="menu_button"><MenuIcon /></IconButton>
                    <Typography variant="h6" className="title_text">Model Builder</Typography>
                    <Button color="inherit" className="login_button">Login</Button>
                </Toolbar>
            </AppBar>
        ); 
    }

}

export default Header;
