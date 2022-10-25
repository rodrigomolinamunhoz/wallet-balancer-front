import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCliente from '../../../../../components/NavbarCliente';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    useColorModeValue,
    FormErrorMessage,
} from '@chakra-ui/react';

const schema = yup
    .object({
        nomeCarteira: yup.string().required('Campo obrigatório!').min(4, 'O nome deve conter no mínimo quatro caracteres!').matches(/^[a-z0-9]+$/i, 'Digite um nome válido!'),
    })
    .required()

const AdicionarCarteira = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = values => {
        alert('Falta integrar com API!');
    };

    const voltar = () => {
        navigate('/gerenciar-carteiras');
    };

    return (
        <>
            <NavbarCliente />

            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
                paddingBottom={300}
            >
                <Stack spacing={8} mx={'auto'} py={3} px={6}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                        width={800}
                    >
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormControl id="nomeCarteira" isInvalid={errors.nomeCarteira}>
                                    <FormLabel textAlign={'center'} marginBottom={'20px'}>Informe o nome da sua nova carteira</FormLabel>
                                    <Input id="nomeCarteira" {...register('nomeCarteira')} />
                                    <FormErrorMessage>
                                        {errors.nomeCarteira && errors.nomeCarteira.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Stack direction={{ base: 'column', sm: 'row' }} justify={'center'} marginTop={'20px'}>
                                    <Button
                                        type="submit"
                                        colorScheme='blue'
                                        size='sm'
                                    >
                                        Adicionar
                                    </Button>
                                    <Button
                                        onClick={() => voltar()}
                                        colorScheme='blue'
                                        size='sm'
                                    >
                                        Voltar
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default AdicionarCarteira;