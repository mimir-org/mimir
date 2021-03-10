import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => {

    const { push } = useHistory();

    return (
        <AppBar className="appbar">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" className="menu_button"><MenuIcon /></IconButton>
                <Typography variant="h6" className="title_text" onClick={() => push('/')}>Model Builder</Typography>
                <Button color="inherit" className="login_button" onClick={() => push('/home/diagram')}>Blokkdiagram</Button>
                <Button color="inherit" className="login_button" onClick={() => push('/home/treeview')}>Trestruktur</Button>
                <Button color="inherit" className="login_button">Login</Button>
            </Toolbar>
        </AppBar>
        ); 
}

export default Header;
