import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          size="large"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;