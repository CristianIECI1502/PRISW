import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createBeneficio } from '../services/beneficio.service'; 
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";

const CrBeneficio = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values, { setErrors, setSubmitting }) => {
        console.log('handleSubmit called with values:', values);
        try {
            await createBeneficio(values);
            navigate('/beneficios'); // navigate to success page after successful form submission
        } catch (error) {
            console.log('Error response:', error.response); // Agrega esto para ver la respuesta de error
            setErrors({ submit: 'Ocurrió un error al crear el beneficio' });
            setSubmitting(false); // Forzar una nueva renderización
        }
    };

    const formik = useFormik({
        initialValues: {
            beneficioname: '',
            descripcion: '',
            empresaAsociada: '',
            descuento: '',
            fechaInicio: '',
            fechaFin: ''
        },
        validationSchema: Yup.object({
            beneficioname: Yup.string()
            .matches(/^[A-Za-z0-9 ]+$/, 'El nombre del beneficio no puede contener símbolos. ')
            .required('El nombre del beneficio es obligatorio')
            .max(20, 'La descripción no puede tener más de 20 caracteres'),
            descripcion: Yup.string()
            .matches(/^[A-Za-z0-9 ]+$/, 'El nombre del beneficio no puede contener símbolos.')
            .required('La descripción es obligatoria')
            .min(5, 'La descripción debe tener al menos 5 caracteres')
            .max(30, 'La descripción no puede tener más de 30 caracteres'),
            empresaAsociada: Yup.string()
            .matches(/^[A-Za-z0-9 ]+$/, 'El nombre del beneficio no puede contener símbolos.')
            .required('La empresa asociada es obligatoria')
            .max(20, 'La empresa asociada no puede tener más de 20 caracteres'),
            descuento: Yup.number()
            .required('El descuento es obligatorio')
            .min(0, 'El descuento no puede ser menor a 0')
            .max(100, 'El descuento no puede ser mayor a 100'),
            fechaInicio: Yup.date()
            .required('La fecha de inicio es obligatoria'),
            fechaFin: Yup.date()
            .required('La fecha de fin es obligatoria')
        }),
        onSubmit: handleSubmit,
    });

    return (
        <Box bg="#f8fa8d" minH="100vh">
          <Box p={5} maxW="800px" mx="auto" bg="#f8fa8d" borderRadius="20px" color="black">
            <div style={{backgroundColor: "#676926", borderRadius: "20px", padding: "20px"}}>
              <form onSubmit={formik.handleSubmit} style={{textAlign: "center", color: "white"}}>
                <FormControl id="beneficioname" isRequired isInvalid={formik.errors.beneficioname && formik.touched.beneficioname}>
                  <FormLabel>Nombre del beneficio</FormLabel>
                  <Input placeholder='Nombre del beneficio' type="text" {...formik.getFieldProps('beneficioname')} />
                  <FormErrorMessage>{formik.errors.beneficioname}</FormErrorMessage>
                </FormControl>
                <FormControl id="descripcion" isRequired isInvalid={formik.errors.descripcion && formik.touched.descripcion}>
                  <FormLabel>Descripción</FormLabel>
                  <Textarea placeholder='Descripción' {...formik.getFieldProps('descripcion')} />
                  <FormErrorMessage>{formik.errors.descripcion}</FormErrorMessage>
                </FormControl>
                <FormControl id="empresaAsociada" isRequired isInvalid={formik.errors.empresaAsociada && formik.touched.empresaAsociada}>
                  <FormLabel>Empresa Asociada</FormLabel>
                  <Input placeholder='Empresa Asociada' type="text" {...formik.getFieldProps('empresaAsociada')} />
                  <FormErrorMessage>{formik.errors.empresaAsociada}</FormErrorMessage>
                </FormControl>
                <FormControl id="descuento" isRequired isInvalid={formik.errors.descuento && formik.touched.descuento}>
                  <FormLabel>Descuento</FormLabel>
                  <Input placeholder='Descuento' type="number" {...formik.getFieldProps('descuento')} />
                  <FormErrorMessage>{formik.errors.descuento}</FormErrorMessage>
                </FormControl>
                <FormControl id="fechaInicio" isRequired isInvalid={formik.errors.fechaInicio && formik.touched.fechaInicio}>
                  <FormLabel>Fecha de Inicio</FormLabel>
                  <Input placeholder='Fecha de Inicio' type="date" {...formik.getFieldProps('fechaInicio')} />
                  <FormErrorMessage>{formik.errors.fechaInicio}</FormErrorMessage>
                </FormControl>
                <FormControl id="fechaFin" isRequired isInvalid={formik.errors.fechaFin && formik.touched.fechaFin}>
                  <FormLabel>Fecha de Fin</FormLabel>
                  <Input placeholder='Fecha de Fin' type="date" {...formik.getFieldProps('fechaFin')} />
                  <FormErrorMessage>{formik.errors.fechaFin}</FormErrorMessage>
                </FormControl>
                <Button mt={4} mb={2} mr={24} bg="#00A6ED" color="white"
isLoading={formik.isSubmitting} type="submit">
  Crear Beneficio
</Button>
                <Button mt={2} colorScheme='red' onClick={() => navigate('/beneficios')}>
                  Atras
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      );
};

export default CrBeneficio;