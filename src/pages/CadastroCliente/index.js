import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Image,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import ApiService from '../../services/ApiService';
import { useLoader } from '../../context/loaderProvider';
import NotificationService from '../../services/NotificationService';

const schema = yup
  .object({
    codigo: yup
      .string()
      .required('Campo obrigatório!')
      .matches(/^[0-9]+$/, 'Digite somente números')
      .min(6, 'Insira um código válido')
      .max(6, 'Insira um código válido'),
    nome: yup.string().required('Campo obrigatório!'),
    emailPrimario: yup
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
  const loader = useLoader();
  const toast = useToast();
  let { codigo } = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      codigo,
    },
  });

  const onSubmit = async values => {
    try {
      loader.setLoader(true);
      await ApiService.cadastrarCliente(
        values.codigo,
        values.nome,
        values.emailPrimario,
        values.emailSecundario,
        values.senha
      );

      NotificationService.showSuccessAlert(
        toast,
        'Cliente cadastrado com sucesso!'
      );
      navigate('/');
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
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
          <Image
            htmlHeight={70}
            htmlWidth={70}
            src={'/LogoWB.png'}
            alt="Logo"
          />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Heading fontSize={'1xl'} textAlign="center" textColor={'black'}>
            CADASTRO DE CLIENTE
          </Heading>
          <br />
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="codigo" isInvalid={errors.codigo}>
                <FormLabel>Código</FormLabel>
                <Input id="codigo" type="number" {...register('codigo')} />
                <FormErrorMessage>
                  {errors.codigo && errors.codigo.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="nome" isInvalid={errors.nome}>
                <FormLabel>Nome</FormLabel>
                <Input id="nome" {...register('nome')} />
                <FormErrorMessage>
                  {errors.nome && errors.nome.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="emailPrimario" isInvalid={errors.emailPrimario}>
                <FormLabel>E-mail Principal</FormLabel>
                <Input id="emailPrimario" {...register('emailPrimario')} />
                <FormErrorMessage>
                  {errors.emailPrimario && errors.emailPrimario.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="emailSecundario"
                isInvalid={errors.emailSecundario}
              >
                <FormLabel>E-mail Secundário</FormLabel>
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
