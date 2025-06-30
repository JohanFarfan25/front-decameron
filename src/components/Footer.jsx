import { Outlet } from 'react-router-dom';
import { 
  Container, 
  CssBaseline, 
  Box,
  Typography,
  Grid,
  Link,
  Divider
} from '@mui/material';
import { DecameronIcon } from '../assets/icons/DecameronIcon';

function Footer() {
  return (
    <>
      <CssBaseline />
      
      {/* Contenido principal */}
      <Box component="main" sx={{ 
        minHeight: 'calc(100vh - 120px)', 
        pb: 4 
      }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
      
      {/* Footer */}
      <Box component="footer" sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 'auto'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo y descripción */}
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mb: 2
              }}>
                <DecameronIcon sx={{ 
                  width: 40, 
                  height: 40,
                  mr: 2
                }} />
                <Typography variant="h6" component="div">
                  Decameron Hoteles
                </Typography>
              </Box>
              <Typography variant="body2">
                Experiencias vacacionales inolvidables en los mejores destinos.
              </Typography>
            </Grid>
            
            {/* Enlaces rápidos */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" gutterBottom>
                Enlaces
              </Typography>
              <Box component="ul" sx={{ 
                listStyle: 'none', 
                p: 0,
                '& li': { mb: 1 }
              }}>
                <li><Link href="/hoteles" color="inherit" underline="hover">Hoteles</Link></li>
                <li><Link href="/habitaciones" color="inherit" underline="hover">Habitaciones</Link></li>
                <li><Link href="/reservas" color="inherit" underline="hover">Reservas</Link></li>
                <li><Link href="/contacto" color="inherit" underline="hover">Contacto</Link></li>
              </Box>
            </Grid>
            
            {/* Contacto */}
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" gutterBottom>
                Contacto
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Box component="span" sx={{ fontWeight: 'bold' }}>Teléfono:</Box> +57 322 711 1889
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Box component="span" sx={{ fontWeight: 'bold' }}>Email:</Box> johanfarfan25@gmail.com
              </Typography>
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 'bold' }}>Dirección:</Box> Cra. 10 #26-21, Bogotá
              </Typography>
            </Grid>
            
            {/* Redes sociales */}
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom>
                Síguenos
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                mb: 2
              }}>
                <Link href="https://www.facebook.com/JohanFarfanSierra" color="inherit">
                  <i className="fab fa-facebook" style={{ fontSize: '1.5rem' }}></i>
                </Link>
                <Link href="https://www.instagram.com/johanfarfansierra/" color="inherit">
                  <i className="fab fa-instagram" style={{ fontSize: '1.5rem' }}></i>
                </Link>
                <Link href="https://www.linkedin.com/in/johan-alexander-farfan-sierra-617844b7/" color="inherit">
                  <i className="fab fa-linkedin" style={{ fontSize: '1.5rem' }}></i>
                </Link>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ 
            my: 3, 
            bgcolor: 'rgba(255,255,255,0.2)' 
          }} />
          
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Decameron Hoteles. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Footer;