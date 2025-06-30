import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button,
  MenuItem, FormControl, InputLabel, Select,
  CircularProgress, Alert, Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  room_type_id: Yup.string().required('El tipo de habitación es requerido'),
  accommodation: Yup.string().required('La acomodación es requerida'),
  quantity: Yup.number()
    .required('La cantidad es requerida')
    .min(1, 'Mínimo 1 habitación')
    .max(Yup.ref('maxQuantity'), 'No puede exceder el máximo disponible')
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: 3,
  overflow: 'hidden'
};

const headerStyle = {
  p: 3,
  bgcolor: 'primary.main',
  color: 'primary.contrastText'
};

const contentStyle = {
  p: 3
};

const roomTypes = [
  { id: 1, name: 'suite', label: 'Suite' },
  { id: 2, name: 'standard', label: 'Estándar' },
  { id: 3, name: 'junior', label: 'Junior' }
];

const accommodations = [
  { id: 1, name: 'single', label: 'Individual' },
  { id: 2, name: 'double', label: 'Doble' },
  { id: 3, name: 'triple', label: 'Triple' },
  { id: 4, name: 'quadruple', label: 'Cuádruple' }
];

const translateAccommodation = (accommodation) => {
  const translations = {
    'single': 'Individual',
    'double': 'Doble',
    'triple': 'Triple',
    'quadruple': 'Cuádruple'
  };
  return translations[accommodation] || accommodation;
};

function AddRoomModal({ loading, formId, open, onClose, onSubmit, maxQuantity }) {
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      hotel_id: '',
      room_type_id: '',
      accommodation: '',
      quantity: 1,
      maxQuantity: maxQuantity
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        hotel_id: formId,
        room_type: values.room_type_id,
        accommodation: values.accommodation,
        quantity: Number(values.quantity)
      });
    }
  });

  useEffect(() => {
    const { setFieldValue, values } = formik;
    setFieldValue('maxQuantity', maxQuantity);
    if (values.quantity > maxQuantity) {
      setFieldValue('quantity', maxQuantity);
    }
  }, [maxQuantity]);

  if (loading) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <Box sx={headerStyle}>
            <Typography variant="h6">Agregar Habitación</Typography>
          </Box>
          <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="primary" />
          </Box>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h6">Agregar Habitación</Typography>
        </Box>
        
        <Box sx={contentStyle}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="room-type-label">Tipo de Habitación</InputLabel>
              <Select
                labelId="room-type-label"
                id="room_type_id"
                name="room_type_id"
                label="Tipo de Habitación"
                value={formik.values.room_type_id}
                onChange={formik.handleChange}
                error={formik.touched.room_type_id && Boolean(formik.errors.room_type_id)}
                sx={{ mb: 2 }}
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="accommodation-label">Acomodación</InputLabel>
              <Select
                labelId="accommodation-label"
                id="accommodation"
                name="accommodation"
                label="Acomodación"
                value={formik.values.accommodation}
                onChange={formik.handleChange}
                disabled={!formik.values.room_type_id}
                error={formik.touched.accommodation && Boolean(formik.errors.accommodation)}
                sx={{ mb: 2 }}
              >
                {accommodations.map((accommodation) => (
                  <MenuItem key={accommodation.id} value={accommodation.name}>
                    {translateAccommodation(accommodation.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              id="quantity"
              name="quantity"
              label="Cantidad"
              type="number"
              variant="outlined"
              inputProps={{
                min: 1,
                max: maxQuantity
              }}
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={
                formik.touched.quantity && formik.errors.quantity
                  ? formik.errors.quantity
                  : `Máximo disponible: ${maxQuantity}`
              }
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />

            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 3
            }}>
              <Button
                onClick={onClose}
                variant="outlined"
                color="secondary"
                sx={{ px: 3, borderRadius: 1 }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 3, borderRadius: 1 }}
                disabled={!formik.isValid || loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddRoomModal;