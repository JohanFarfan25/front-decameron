
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
} from '@mui/material';
import { DecameronIcon } from '../assets/icons/DecameronIcon';
import Footer from './Footer';

function Layout() {
    return (
        <>
            <CssBaseline />
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
                        <DecameronIcon />
                    </Typography>
                </Toolbar>
            </AppBar>
            <Footer />
        </>
    );
}

export default Layout;