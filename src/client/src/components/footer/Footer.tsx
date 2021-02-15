import { BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import RestoreIcon from '@material-ui/icons/Restore';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Footer = () => {
    return(
        <BottomNavigation className="footer">            
            <BottomNavigationAction className="item" label="Recents" icon={<RestoreIcon style={{ fill: "white"}} />} />
            <BottomNavigationAction className="item" label="Nearby" icon={<LocationOnIcon style={{ fill: "white"}} />} />
        </BottomNavigation>
    );    
};

export default Footer;
