import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createForm } from '../services/form.service';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    ButtonGroup,
    FormErrorMessage,
    Textarea
} from '@chakra-ui/react';

const CrForm = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values, { setErrors, setSubmitting }) => {
        console.log('handleSubmit called with values:', values);
        try {
            await createForm(values);
            navigate('/success'); // navigate to success page after successful form submission
        } catch (error) {
            console.log('Error response:', error.response); // Agrega esto para ver la respuesta de error
            if (error.response && error.response.status === 400 && error.response.data.message === 'El postulante ya existe') {
                setErrors({ rut: 'Este RUT ya existe' });
            } else {
                setErrors({ submit: 'Ocurrió un error al crear el formulario' });
            }
            setSubmitting(false); // Forzar una nueva renderización
        }
    };
    
    const rutValidation = Yup.string()
    .required('El RUT es obligatorio')
    .matches(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]{1}$/, 'El formato del RUT no es válido. Debe ser \'12.345.678-9\'')
    .test('RUT-valid', 'El RUT ingresado no es válido', (value) => {
        if (!value) return false;
        const rut = value.replace(/[.\-kK]/g, "");
        const rutDigits = parseInt(rut.slice(0, -1), 10);
        const verifierDigit = rut.slice(-1).toUpperCase();

        let sum = 0;
        let multiplier = 2;

        for (let i = rutDigits.toString().length - 1; i >= 0; i--) {
            sum += rutDigits.toString().charAt(i) * multiplier;
            multiplier = multiplier % 7 === 0 ? 2 : multiplier + 1;
        }

        const calculatedVerifierDigit = 11 - (sum % 11);
        const calculatedVerifierDigitString = calculatedVerifierDigit === 10 ? "K" : calculatedVerifierDigit === 11 ? "0" : calculatedVerifierDigit.toString();

        return calculatedVerifierDigitString === verifierDigit;
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            rut: '',
            email: '',
            phoneNumber: '',
            address: '',
            message: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'El nombre solo debe contener caracteres alfabéticos')
            .required('El nombre es obligatorio'),
            rut: rutValidation,
            email: Yup.string().email('El correo no es válido').required('El correo es obligatorio'),
            phoneNumber: Yup.number()
                .integer('El número de teléfono debe ser un número entero')
                .min(100000000, 'El número de teléfono debe tener 9 dígitos')
                .max(999999999, 'El número de teléfono debe tener 9 dígitos')
                .required('El número de teléfono es obligatorio')
                .typeError('El número de teléfono debe ser un número'),
            message: Yup.string()
                .required('Mensaje es requerido')
                .test('no-numbers-or-symbols-only', 'Mensaje no puede contener solo números o símbolos', (value) => {
                    if (!value) return false;
                    const containsLetter = /[a-zA-Z]/.test(value);
                    return containsLetter;
                })
                .typeError('Mensaje debe ser de tipo String'),
            address: Yup.string()
                .matches(/^[A-Za-z0-9# ]+$/, 'La dirección puede contener caracteres alfabéticos, números y #')
                .required('La dirección es requerida')
                .typeError('La dirección debe ser de tipo String'),
            }),
        onSubmit: handleSubmit,
    });

    return (
        <Box p={5}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl id="nombre" isRequired isInvalid={formik.errors.nombre && formik.touched.nombre}>
                    <FormLabel>Nombre</FormLabel>
                    <Input placeholder='Juan Perez' type="text" {...formik.getFieldProps('nombre')} />
                    <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
                </FormControl>

                <FormControl id="rut" mt={4} isRequired isInvalid={formik.errors.rut && formik.touched.rut}>
                    <FormLabel>RUT</FormLabel>
                    <Input placeholder='11.111.111-1' type="text" {...formik.getFieldProps('rut')} />
                    <FormErrorMessage>{formik.errors.rut}</FormErrorMessage>
                </FormControl>

                <FormControl id="correo" mt={4} isRequired isInvalid={formik.errors.email && formik.touched.email}>
                    <FormLabel>Correo</FormLabel>
                    <Input placeholder='Tu_Correo@email.com' type="email" {...formik.getFieldProps('email')} />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl id="telefono" mt={4} isRequired isInvalid={formik.errors.phoneNumber && formik.touched.phoneNumber}>
                    <FormLabel>Número de Teléfono</FormLabel>
                    <InputGroup>
                        <InputLeftAddon>+56</InputLeftAddon>
                        <Input placeholder='912345678' type="tel" {...formik.getFieldProps('phoneNumber')} />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
                </FormControl>

                <FormControl id="direccion" mt={4} isRequired isInvalid={formik.errors.address && formik.touched.address}>
                    <FormLabel>Dirección</FormLabel>
                    <Input placeholder='Rio #111' type="text" {...formik.getFieldProps('address')} />
                    <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl id="mensaje" mt={4} isRequired isInvalid={formik.errors.message && formik.touched.message}>
                    <FormLabel>Mensaje de Solicitud</FormLabel>
                    <Textarea placeholder='Describa por que quiere la tarjeta vecina' {...formik.getFieldProps('message')} />
                </FormControl>

                <FormControl id="submit" mt={4} isInvalid={formik.errors.submit}>
                    <FormErrorMessage>{formik.errors.submit}</FormErrorMessage>
                </FormControl>

                <ButtonGroup>
                    <Button mt={4} colorScheme='red' onClick={(()=> navigate('/'))}>
                        Atras
                    </Button>
                    <Button mt={4} colorScheme="teal" type="submit">
                        Enviar
                    </Button>
                </ButtonGroup>
            </form>
        </Box>
    );
};

export default CrForm;