import { Component } from 'react';
import { BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class Footer extends Component {

    render() {
        
        return(
            <BottomNavigation className="footer">            
                <BottomNavigationAction className="item" label="Recents" icon={<RestoreIcon style={{ fill: "white"}} />} />
                <BottomNavigationAction className="item" label="Nearby" icon={<LocationOnIcon style={{ fill: "white"}} />} />
            </BottomNavigation>
        );
    }
}

export default Footer;
