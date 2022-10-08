import React from 'react';
import Navbar from '../../../../components/Navbar';
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
  FormErrorMessage,
  useToast,
  Select,
  Image,
} from '@chakra-ui/react';

const schema = yup
  .object({
    emailConvite: yup.string().email('Insira um e-mail válido.').required('Campo obrigatório!'),
  })
  .required();

const ConvidarCliente = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {  
    toast({
        title: 'E-mail enviado com sucesso!',
        status: 'success',
        duration: 4000,
        position: 'top',
        isClosable: true,
      });
    console.log(values);
  };

  const toast = useToast();

  return (<>
    <Navbar />
    <Flex
      minH={'60vh'}
      align={'center'}
      justify={'center'}
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