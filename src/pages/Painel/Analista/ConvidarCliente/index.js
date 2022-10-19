import React from 'react';
import Navbar from '../../../../components/Navbar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ApiService from '../../../../services/ApiService';
import { CacheService } from '../../../../services/CacheService';
import { StorageKeys } from '../../../../constants/StorageKeys';
import { useLoader } from '../../../../context/loaderProvider';
import NotificationService from '../../../../services/NotificationService';
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
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

const schema = yup
  .object({
    emailConvite: yup
      .string()
      .email('Insira um e-mail válido.')
      .required('Campo obrigatório!'),
  })
  .required();

const ConvidarCliente = () => {
  const toast = useToast();
  const loader = useLoader();

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
      await ApiService.convidar(
        CacheService.get(StorageKeys.IdAnalista),
        values.emailConvite
      );
      NotificationService.showSuccessAlert(
        toast,
        'E-mail enviado com sucesso!'
      );
      reset({ emailConvite: '' });
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        minH={'90vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        paddingBottom={300}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'2xl'}>Convidar Cliente</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="emailConvite" isInvalid={errors.emailConvite}>
                  <FormLabel>Email</FormLabel>
                  <Input id="emailConvite" {...register('emailConvite')} />
                  <FormErrorMessage>
                    {errors.emailConvite && errors.emailConvite.message}
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
                    Enviar
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

export default ConvidarCliente;
