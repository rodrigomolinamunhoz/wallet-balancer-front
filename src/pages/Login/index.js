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
import ApiService from '../../services/ApiService';

const schema = yup
  .object({
    tipoAcesso: yup.string().required('Campo obrigatório!'),
    email: yup
      .string()
      .email('Insira um e-mail válido.')
      .required('Campo obrigatório!'),
    senha: yup.string().required('Campo obrigatório!'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    try {
      var resultado = await ApiService.login(
        values.tipoAcesso,
        values.email,
        values.senha
      );
      if (resultado != null && values.tipoAcesso === '1') {
        navigate('/painel-analista');
      }
    } catch (error) {
      alert('usuário ou senha inválidos');
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
          <Image htmlHeight={70} htmlWidth={70} src="./LogoWB.png" alt="Logo" />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="tipoAcesso" isInvalid={errors.tipoAcesso}>
                <FormLabel>Tipo Acesso</FormLabel>
                <Select placeholder="Selecione" {...register('tipoAcesso')}>
                  <option key="1" value="1">
                    Analista
                  </option>
                  <option key="2" value="2">
                    Cliente
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.tipoAcesso && errors.tipoAcesso.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="email" isInvalid={errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input id="email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
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
                  Entrar
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
