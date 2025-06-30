import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography, Button, CircularProgress, Box, Grid,
  Card, CardContent, CardActions, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl,
  Divider
} from '@mui/material';
import api from '../../services/axiosIntance';
import AddRoomModal from '../../components/AddRoomModal';
import { showNotification } from '../../components/Notification';
import { addRoom, updateRoom } from '../../services/rooms';
import { AddCircle, Delete, Edit } from '@mui/icons-material';

function HotelRooms({
  formId,
  rooms: initialRooms = [],
  name = '',
  room_count = 0,
}) {
  const { id: hotelId } = useParams();
  const [rooms, setRooms] = useState(initialRooms);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [editForm, setEditForm] = useState({
    room_type: '',
    accommodation: '',
    quantity: 1
  });

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  const handleAddRoom = async (newRoom) => {
    try {
      setLoading(true);
      const response = await addRoom({
        ...newRoom,
        hotel_id: hotelId
      });
      if (response.data?.status === 'success') {
        showNotification('success', 'Habitación agregada exitosamente', '¡En hora buena!');
        setRooms([...rooms, response.data.data]);
        setOpenModal(false);
      } else {
        showNotification('info', response.data?.message ?? 'Ocurrió un error al agregar la habitación', 'Ups, algo salió mal');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification('info', error.response.data?.message ?? 'Validación fallida', 'Ups, algo salió mal');
      } else {
        showNotification('error', error.message || 'Ocurrió un error inesperado al agregar la habitación', 'Alerta, algo salió mal');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setEditForm({
      room_type: room.room_type,
      accommodation: room.accommodation,
      quantity: room.quantity
    });
    setEditOpen(true);
  };

  const handleUpdateRoom = async () => {
    try {
      setLoading(true);
      const response = await updateRoom(editingRoom.uuid, {
        ...editForm,
        hotel_id: hotelId
      });
      if (response.data?.status === 'success') {
        showNotification('success', 'Habitación actualizada exitosamente', '¡En hora buena!');
        setRooms(rooms.map(room =>
          room.uuid === editingRoom.uuid ? response.data.data : room
        ));
        setEditOpen(false);
      } else {
        showNotification('info', response.data?.message ?? 'Ocurrió un error al actualizar la habitación', 'Ups, algo salió mal');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification('info', error.response.data?.message ?? 'Validación fallida', 'Ups, algo salió mal');
      } else {
        showNotification('error', error.message || 'Ocurrió un error inesperado al actualizar la habitación', 'Alerta, algo salió mal');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (roomId) => {
    setRoomToDelete(roomId);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await api.delete(`/rooms/${roomToDelete}`);
      if (response.data?.status === 'success') {
        showNotification('success', 'Habitación eliminada exitosamente', '¡En hora buena!');
      } else {
        showNotification('info', response.data?.message ?? 'Ocurrió un error al eliminar la habitación', 'Ups, algo salió mal');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showNotification('info', error.response.data?.message ?? 'Validación fallida', 'Ups, algo salió mal');
      } else {
        showNotification('error', error.message || 'Alerta, algo salió mal');
      }
    } finally {
      setDeleteOpen(false);
      setLoading(false);
      setRoomToDelete(null);
    }
  };

  const translateAccommodation = (accommodation) => {
    if (!accommodation) return 'N/A';

    const translations = {
      'single': 'Individual',
      'double': 'Doble',
      'triple': 'Triple',
      'quadruple': 'Cuádruple'
    };

    return translations[accommodation.toLowerCase()] || accommodation;
  };

  const totalAssigned = rooms.reduce((sum, room) => sum + (room.quantity || 0), 0);
  const available = room_count - totalAssigned;

  return (
    <Box sx={{
      width: '100%',
      margin: '0 auto',
      p: { xs: 2, md: 3 },
      background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
      borderRadius: 2,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        Habitaciones
      </Typography>

      <Grid container spacing={2} sx={{ mt: 4, mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Box sx={{
            p: 2,
            border: '1px solid',
            borderImage: 'linear-gradient(45deg, #2196F3, #4CAF50) 1',
            borderRadius: '5px',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <Typography variant="subtitle1">Total Habitaciones</Typography>
            <Typography variant="h6" color="primary">{room_count}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{
            p: 2,
            border: '1px solid',
            borderImage: 'linear-gradient(45deg, #FF9800, #E91E63) 1',
            borderRadius: '5px',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <Typography variant="subtitle1">Total Asignadas</Typography>
            <Typography variant="h6" color="secondary">{totalAssigned}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{
            p: 2,
            border: '1px solid',
            borderImage: `linear-gradient(45deg, ${available <= 0 ? '#F44336' : '#4CAF50'}, #8BC34A) 1`,
            borderRadius: '5px',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <Typography variant="subtitle1">Total Disponibles</Typography>
            <Typography variant="h6" color={available <= 0 ? 'error' : 'success'}>
              {Math.max(available, 0)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3, mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => setOpenModal(true)}
          disabled={available <= 0 || loading}
          sx={{
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Agregar Habitación'}
        </Button>
      </Box>

      {available < 0 && (
        <Box sx={{
          mb: 3,
          p: 2,
          backgroundColor: 'error.light',
          color: 'error.contrastText',
          borderRadius: '5px',
          borderLeft: '4px solid',
          borderColor: 'error.main'
        }}>
          <Typography>
            Advertencia: Las asignaciones superan el total de habitaciones en {Math.abs(available)}
          </Typography>
        </Box>
      )}

      {rooms.length === 0 ? (
        <Box sx={{
          p: 4,
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: '5px',
          backgroundColor: 'background.paper'
        }}>
          <Typography variant="subtitle1" color="text.secondary">
            No hay habitaciones registradas para este hotel
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room?.id}>
              <Card sx={{
                border: '1px solid',
                borderImage: 'linear-gradient(45deg, #9E9E9E, #E0E0E0) 1',
                borderRadius: '5px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Habitación {room?.room_type ? room.room_type.charAt(0).toUpperCase() + room.room_type.slice(1) : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cantidad: {room?.quantity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Acomodación: {translateAccommodation(room?.accommodation)}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', mt: 'auto' }}>
                  <Button
                    size="small"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => handleEditRoom(room)}
                    disabled={loading}
                    sx={{ borderRadius: '5px', mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteClick(room.uuid)}
                    disabled={loading}
                    sx={{ borderRadius: '5px' }}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Modal para agregar nueva habitación */}
      <AddRoomModal
        formId={formId}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddRoom}
        maxQuantity={available}
        loading={loading}
      />

      {/* Dialog para editar habitación */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Habitación</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Habitación</InputLabel>
              <Select
                value={editForm.room_type}
                onChange={(e) => setEditForm({ ...editForm, room_type: e.target.value })}
                label="Tipo de Habitación"
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="suite">Suite</MenuItem>
                <MenuItem value="junior">Junior</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Acomodación</InputLabel>
              <Select
                value={editForm.accommodation}
                onChange={(e) => setEditForm({ ...editForm, accommodation: e.target.value })}
                label="Acomodación"
              >
                <MenuItem value="single">Individual</MenuItem>
                <MenuItem value="double">Doble</MenuItem>
                <MenuItem value="triple">Triple</MenuItem>
                <MenuItem value="quadruple">Cuádruple</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Cantidad"
              type="number"
              value={editForm.quantity}
              onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
              inputProps={{ min: 1, max: available + editingRoom?.quantity }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleUpdateRoom}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Guardar Cambios'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)} maxWidth="xs">
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <Divider sx={{ my: 1.5 }} />
        <DialogContent>
          <Typography>¿Estás seguro que deseas eliminar esta habitación?</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 4 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteOpen(false)}
          >Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="outlined"
            color="success"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Eliminar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HotelRooms;