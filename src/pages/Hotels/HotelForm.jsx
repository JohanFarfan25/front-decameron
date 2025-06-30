import React, { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/axiosIntance';
import { addHotel, updateHotel } from '../../services/hotels';
import HotelRooms from '../Rooms/HotelRooms';
import { showNotification } from '../../components/Notification';

// Validación del formulario con Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es requerido'),
    address: Yup.string().required('Direccion es requerida'),
    city: Yup.string().required('Ciudad es requerida'),
    nit: Yup.string().required('NIT es requerido'),
    number_of_rooms: Yup.number()
        .required('Cantidad de habitaciones es requerida')
        .min(1, 'Debe ser al menos 1')
        .integer('Debe ser un número entero')
});

// HotelForm Component
function HotelForm({ isEdit }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(isEdit);
    const [initialLoad, setInitialLoad] = useState(true);


    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            city: '',
            nit: '',
            number_of_rooms: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                if (isEdit) {
                    const res = await updateHotel(id, values);
                    if (res?.data?.status === 'success') {
                        showNotification('success', 'Hotel actualizado exitosamente', '¡En hora bueena!', `/hotels/${id}/edit`);
                    }
                } else {
                    const res = await addHotel(values);
                    if (res?.data?.status === 'success') {
                        showNotification('success', 'success', 'Hotel creado exitosamente', '¡En hora bueena!', `/hotels/${res.data.uuid}/edit`);
                    } else {
                        showNotification('info', res.data?.message ?? 'Ocurrio un error al crear el hotel', 'Upps, algo salió mal');
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    showNotification('info', error.response.data?.message ?? 'Validación fallida', 'Upps, algo salió mal');
                } else {
                    showNotification('error', error.message || 'Ocurrio un error al crear el hotel', 'Alerta, algo salió mal');
                }
            } finally {
                setLoading(false);
            }
        }
    });

    const fetchHotelData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/hotels/one/${id}`);

            if (!response.data?.data) {
                throw new Error('Invalid hotel data structure');
            }

            formik.setValues({
                name: response.data.data.name,
                address: response.data.data.address,
                city: response.data.data.city,
                nit: response.data.data.nit,
                number_of_rooms: response.data.data.number_of_rooms,
                rooms: response.data.data.rooms || []
            });

            setInitialLoad(false);
        } catch (error) {
            showNotification(error.response?.data?.message || 'Error loading hotel data', 'error');
            navigate('/hotels');
        } finally {
            setLoading(false);
        }
    }, [id, navigate, showNotification]);

    useEffect(() => {
        if (isEdit && initialLoad) {
            fetchHotelData();
        }
    }, [isEdit, initialLoad, fetchHotelData]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            sx={{
                mt: 5,
                p: 4,
                maxWidth: 800,
                margin: '0 auto',
                borderRadius: 3,
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    mb: 4,
                    fontWeight: 600,
                    color: 'text.primary',
                    textAlign: 'center'
                }}
            >
                {isEdit ? `Hotel ${formik.values.name}` : 'Crear Hotel'}
            </Typography>

            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <Grid container spacing={3}>
                    {/* Primera fila: Nombre y NIT */}
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Nombre del Hotel"
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="nit"
                                name="nit"
                                label="NIT"
                                variant="outlined"
                                value={formik.values.nit}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nit && Boolean(formik.errors.nit)}
                                helperText={formik.touched.nit && formik.errors.nit}
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>

                    {/* Segunda fila: Dirección y Ciudad */}
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="address"
                                name="address"
                                label="Dirección"
                                variant="outlined"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="city"
                                name="city"
                                label="Ciudad"
                                variant="outlined"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>


                    {/* Tercera fila: Número de habitaciones (centrado) */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                            fullWidth
                            id="number_of_rooms"
                            name="number_of_rooms"
                            label="Cantidad de Habitaciones"
                            type="number"
                            variant="outlined"
                            value={formik.values.number_of_rooms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.number_of_rooms && Boolean(formik.errors.number_of_rooms)}
                            helperText={formik.touched.number_of_rooms && formik.errors.number_of_rooms}
                            disabled={loading}
                            slotProps={{ min: 1 }}
                            sx={{ maxWidth: 400 }}
                        />
                    </Grid>

                </Grid>
                {/* Sección de habitaciones */}
                {isEdit && (
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <HotelRooms
                            formId={formik.values.id}
                            rooms={formik.values.rooms || []}
                            name={formik.values.name}
                            room_count={formik.values.number_of_rooms || 0}
                        />
                    </Grid>)}

                {/* Botones de acción */}
                <Grid item xs={12}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 3
                    }}>
                        <Button
                            variant="outlined"
                            color='secondary'
                            onClick={() => navigate('/hotels')}
                            disabled={loading}
                            sx={{ minWidth: 100 }}
                        >
                            Regersar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            variant="outlined"
                            disabled={loading || !formik.dirty}
                            sx={{ minWidth: 100 }}
                        >
                            {loading ? <CircularProgress size={24} /> : (isEdit ? 'Guardar' : 'Crear')}
                        </Button>
                    </Box>
                </Grid>
            </Box>
        </Paper>
    );
}

export default HotelForm;