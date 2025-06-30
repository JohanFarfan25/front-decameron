import { Outlet } from 'react-router-dom';
import { 
  Container, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography,
  Box
} from '@mui/material';
import { DecameronIcon } from '../assets/icons/DecameronIcon';

function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 1 }}>
            <DecameronIcon/>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Outlet /> {/* Esto renderizará las rutas hijas */}
        </Container>
      </Box>
    </>
  );
}

export default Layout;