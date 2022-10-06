import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Select,
    Image,
    FormErrorMessage,
} from '@chakra-ui/react';

const schema = yup
    .object({
        codigo: yup.string().required('Campo obrigatório!').matches(/^[0-9]+$/, 'Digite somente números').min(6, 'Insira um código válido').max(6, 'Insira um código válido'),
        nome: yup.string().required('Campo obrigatório!'),
        email: yup
            .string()
            .email('Insira um e-mail válido.')
            .required('Campo obrigatório!'),
        emailSecundario: yup
            .string()
            .email('Insira um e-mail válido.')
            .required('Campo obrigatório!'),
        senha: yup.string().required('Campo obrigatório!'),
    })
    .required();

const CadastroCliente = () => {
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        navigate('/painel-cliente');
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Wallet Balancer</Heading>
                    <Image htmlHeight={70} htmlWidth={70} src="./LogoWB.png" alt="Logo" />
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Heading fontSize={'1xl'} textAlign="center" textColor={'black'}>CADASTRO</Heading><br />
                    <Stack spacing={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl id="codigo" isInvalid={errors.codigo}>
                                <FormLabel>Código</FormLabel>
                                <Input id="codigo" type="number"{...register('codigo')} />
                                <FormErrorMessage>
                                    {errors.codigo && errors.codigo.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id="nome" isInvalid={errors.nome}>
                                <FormLabel>Primeiro Nome</FormLabel>
                                <Input id="nome" {...register('nome')} />
                                <FormErrorMessage>
                                    {errors.nome && errors.nome.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id="email" isInvalid={errors.email}>
                                <FormLabel>Email Principal</FormLabel>
                                <Input id="email" {...register('email')} />
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id="emailSecundario" isInvalid={errors.emailSecundario}>
                                <FormLabel>Email Secundário</FormLabel>
                                <Input id="emailSecundario" {...register('emailSecundario')} />
                                <FormErrorMessage>
                                    {errors.emailSecundario && errors.emailSecundario.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl id="senha" isInvalid={errors.senha}>
                                <FormLabel>Senha</FormLabel>
                                <Input type="password" {...register('senha')} />
                                <FormErrorMessage>
                                    {errors.senha && errors.senha.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                ></Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Finalizar Cadastro
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default CadastroCliente;