import React, { useState, useEffect } from 'react';
import NavbarCliente from '../../../../components/NavbarCliente';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Box,
  Button,
  Flex,
  useColorModeValue,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react'
import ApiService from '../../../../services/ApiService';
import { CacheService } from '../../../../services/CacheService';
import { StorageKeys } from '../../../../constants/StorageKeys';
import NotificationService from '../../../../services/NotificationService';

const schema = yup
  .object({
    cadastroAtivo: yup.string().required('Campo obrigatório!'),
    cotacaoAtual: yup.string().required('Campo obrigatório!'),
    objetivo: yup.string().required('Campo obrigatório!').matches(/^[1-9][0-9]?$|^100$/, 'Digite um número entre 1 e 100'),
  })
  .required()

const GerenciarAtivos = () => {
  const toast = useToast();
  const [carteiras, setCarteiras] = useState([]);

  const listarCarteira = async () => {
    try {
      const carteiras = await ApiService.listarCarteira(
        CacheService.get(StorageKeys.IdCliente)
      );
      setCarteiras(carteiras.data);
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    }
  };

  useEffect(() => {
    listarCarteira();
  }, []);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    alert('Falta integrar com API!');
  };

  const limparForm = () => {
    reset({ cadastroAtivo: '', cotacaoAtual: '', objetivo: '' });
  };

  const desabilitarBotoes = () => {
    const bt01 = document.querySelector('#btAdicionar')
    const validacao = document.querySelector('#selecionarCarteira').value

    if (validacao.toString() != '') {
      bt01.disabled = false
    } else {
      bt01.disabled = true
    }
  };

  return <>
    <NavbarCliente />

    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      paddingBottom={300}
    >
      <Stack spacing={3} mx={'auto'} py={3} px={6}>
        <Stack>
          <Select id="selecionarCarteira" placeholder='Selecione uma carteira' size='sm' width={'250px'} bg={useColorModeValue('white', 'gray.700')} rounded={'lg'} onChange={() => desabilitarBotoes()}>
            {carteiras.map(c => {
              return (<option key={c.id}> {c.nome} </option>);
            })}
          </Select>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'md'}
          p={5}
        >
          <Stack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack spacing={'2'}>
                <Box>
                  <FormControl id="cadastroAtivo" isInvalid={errors.cadastroAtivo}>
                    <FormLabel>ATIVO</FormLabel>
                    <Select id="cadastroAtivo" {...register('cadastroAtivo')} placeholder='Selecione' width={'250px'}>
                      <option value='option1'>ITSA4</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.cadastroAtivo && errors.cadastroAtivo.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="cotacaoAtual" isInvalid={errors.cotacaoAtual}>
                    <FormLabel>COTAÇÃO ATUAL</FormLabel>
                    <NumberInput min={1} precision={2} id="cotacaoAtual" {...register('cotacaoAtual')}><NumberInputField /></NumberInput>
                    <FormErrorMessage>
                      {errors.cotacaoAtual && errors.cotacaoAtual.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="objetivo" isInvalid={errors.objetivo}>
                    <FormLabel>OBJETIVO</FormLabel>
                    <Input id="objetivo" {...register('objetivo')} />
                    <FormErrorMessage>
                      {errors.objetivo && errors.objetivo.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <HStack marginTop={'10px'} justify={'flex-end'} direction={'row'}>
                <Button id="btLimpar" onClick={() => limparForm()} colorScheme='blue' size='sm'>Limpar</Button>
                <Button id="btAdicionar" colorScheme='blue' size='sm' type="submit" disabled={true}>Adicionar</Button>
              </HStack>
            </form>
          </Stack>
        </Box>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={5}
        >
          <Stack>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>ATIVO</Th>
                    <Th>COTAÇÃO ATUAL</Th>
                    <Th>OBJETIVO %</Th>
                    <Th textAlign={'center'}>AÇÃO</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>ITSA4</Td>
                    <Td>R$10,00</Td>
                    <Td>50%</Td>
                    <Td textAlign={'center'}>
                      <Button colorScheme='blue' size='sm' margin={'2px'}>Editar</Button>
                      <Button colorScheme='red' size='sm' margin={'2px'}>Excluir</Button>
                    </Td>
                  </Tr >
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </Box>
        <HStack justify={'center'} direction={'row'}>
          <Button marginTop={'20px'} colorScheme='blue' size='sm'>Salvar Ativo(s)</Button>
        </HStack>
      </Stack>
    </Flex>
  </>

};

export default GerenciarAtivos;
