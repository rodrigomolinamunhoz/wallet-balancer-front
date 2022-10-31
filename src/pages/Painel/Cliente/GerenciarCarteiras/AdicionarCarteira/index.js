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
  useToast,
} from '@chakra-ui/react';
import ApiService from '../../../../../services/ApiService';
import { CacheService } from '../../../../../services/CacheService';
import { StorageKeys } from '../../../../../constants/StorageKeys';
import { useLoader } from '../../../../../context/loaderProvider';
import NotificationService from '../../../../../services/NotificationService';

const schema = yup
  .object({
    nomeCarteira: yup
      .string()
      .required('Campo obrigatório!')
      .min(3, 'O nome deve conter no mínimo três caracteres!').max(99, 'O nome da carteira pode ter no máximo 99 caracteres'),
  })
  .required();

const AdicionarCarteira = () => {
  const navigate = useNavigate();
  const loader = useLoader();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async values => {
    try {
      loader.setLoader(true);
      await ApiService.adicionarCarteira({
        nome: values.nomeCarteira,
        id_cliente: CacheService.get(StorageKeys.IdCliente),
      });
      reset({ nomeCarteira: '' });
      NotificationService.showSuccessAlert(
        toast,
        'Registro adicionado com sucesso!'
      );
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
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
        <Stack spacing={8} mx={'auto'} py={3} px={6} w={"lg"}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="nomeCarteira" isInvalid={errors.nomeCarteira}>
                  <FormLabel textAlign={'center'} marginBottom={'20px'}>
                    Informe o nome da sua nova carteira
                  </FormLabel>
                  <Input id="nomeCarteira" {...register('nomeCarteira')} />
                  <FormErrorMessage>
                    {errors.nomeCarteira && errors.nomeCarteira.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  justify={'center'}
                  marginTop={'20px'}
                >
                  <Button type="submit" colorScheme="blue" size="sm">
                    Adicionar
                  </Button>
                  <Button onClick={() => voltar()} colorScheme="blue" size="sm">
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
