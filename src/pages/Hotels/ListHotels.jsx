import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardContent, CardActions, Typography,
  Button, CircularProgress, Box, Chip, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { deleteHotel, getHotels } from '../../services/hotels';
import { Add, Delete, Visibility } from '@mui/icons-material';
import { showNotification } from '../../components/Notification';
import { DecameronIcon } from '../../assets/icons/DecameronIcon';

function ListHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await getHotels();

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error('Formato de datos inesperado');
        }

        setHotels(response.data.data);
      } catch (error) {
        console.error('Error al obtener hoteles:', error);
        setError(error.message || 'Error al cargar los hoteles');
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDeleteClick = (hotelId) => {
    setHotelToDelete(hotelId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteHotel(hotelToDelete);

      if (response.data?.status === 'success') {
        showNotification('success', 'Hotel eliminado exitosamente', '¡En hora buena!');
        setHotels(hotels.filter(hotel => hotel.uuid !== hotelToDelete));
      } else {
        showNotification('error', response.data?.message ?? 'Ocurrió un error al eliminar el hotel', 'Ups, algo salió mal');
      }
    } catch (error) {
      console.error('Error al eliminar el hotel:', error);
      showNotification('error', 'Error al eliminar el hotel', 'Algo salió mal');
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setHotelToDelete(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        p: 3,
        backgroundColor: 'error.light',
        color: 'error.contrastText',
        borderRadius: 2,
        textAlign: 'center',
        mt: 3
      }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>

        <Button
          component={Link}
          to="/hotels/new"
          variant="contained"
          startIcon={<Add />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: '0 2px 10px rgba(25, 118, 210, 0.2)',
            '&:hover': {
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.4)'
            }
          }}
        >
          Nuevo Hotel
        </Button>
      </Box>

      {hotels.length === 0 ? (
        <Box sx={{
          p: 4,
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 3,
          backgroundColor: 'background.paper'
        }}>
          <Typography variant="h6" color="text.secondary">
            No hay hoteles registrados
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.uuid}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderImage: 'linear-gradient(45deg, #9E9E9E, #E0E0E0) 1',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-30px)',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '100%' }}>
                    {hotel.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Ciudad:
                    </Typography>
                    <Chip
                      label={hotel.city}
                      size="small"
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText'
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1.5 }}>
                    <strong>NIT:</strong> {hotel.nit}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Chip
                      label={`${hotel.number_of_rooms} Habitaciones`}
                      color="success"
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  </Box>
                </CardContent>
                {/* Acciones del hotel */}
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    size="small"
                    onClick={() => handleDeleteClick(hotel.uuid)}
                    disabled={loading}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      mr: 1
                    }}
                  >
                    Eliminar
                  </Button>
                  <Button
                    component={Link}
                    to={`/hotels/${hotel.uuid}/edit`}
                    variant="outlined"
                    color="primary"
                    startIcon={<Visibility />}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      mr: 1
                    }}
                  >
                    Ver Detalle
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal de confirmación para eliminar */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <Divider sx={{ my: 1.5 }} />
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ¿Estás seguro que deseas eliminar este hotel?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta acción es irreversible y eliminará toda la información asociada al hotel, incluyendo sus habitaciones.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="error"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="success"
            variant="outlined"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ListHotels;