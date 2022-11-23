import React, { useState, useRef, useEffect } from 'react';
import NavbarCliente from '../../../../components/NavbarCliente';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ApiService from '../../../../services/ApiService';
import { CacheService } from '../../../../services/CacheService';
import { StorageKeys } from '../../../../constants/StorageKeys';
import NotificationService from '../../../../services/NotificationService';
import { useLoader } from '../../../../context/loaderProvider';

const schema = yup
  .object({
    acao: yup.string().required('Campo obrigatório!'),
    cotacaoAtual: yup
      .number()
      .transform(value => (isNaN(value) ? 0 : value))
      .min(0.01, 'Valor deve ser maior que 1 centavo!')
      .required('Campo obrigatório!'),
    objetivo: yup
      .string()
      .transform(value => (isNaN(value) ? 0 : value))
      .matches(/^[1-9][0-9]?$|^100$/, 'Digite um número entre 1 e 100')
      .required('Campo obrigatório!'),
  })
  .required();

const GerenciarAtivos = () => {
  const toast = useToast();
  const [carteiras, setCarteiras] = useState([]);
  const [idCarteira, setIdCarteira] = useState('');
  const [acoes, setAcoes] = useState([]);
  const [acoesCombo, setAcoesCombo] = useState([]);
  const [ativos, setAtivos] = useState([]);
  const [habilitaDesabilitaFormulario, setHabilitaDesabilitaFormulario] =
    useState(true);
  const [habilitaCampoAcao, setHabilitaCampoAcao] = useState(true);
  const [modoEditar, setModoEditar] = useState(false);
  const loader = useLoader();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [ativoDeletado, setAtivoDeletado] = useState(null);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    listarCarteira();
    listarAcoes();
  }, []);

  useEffect(() => {
    renderizarCampoAcao();
  }, [ativos]);

  const processarDelete = () => {
    if (ativoDeletado.quantidade > 0) {
      NotificationService.showErrorAlert(
        toast,
        'Você possui uma quantidade de ações para este ativo. Zere sua posição para poder excluí-lo!'
      );
    } else {
      const newList = ativos.map(a => {
        if (
          a.id === ativoDeletado.id &&
          a.acao_id === parseInt(ativoDeletado.acao_id) &&
          a.tipo_cadastro !== 'R'
        ) {
          const updatedItem = {
            ...a,
            tipo_cadastro: 'R',
          };
          return updatedItem;
        }
        return a;
      });

      setAtivos(newList);
      setAtivoDeletado(null);
    }
  };

  const listarCarteira = async () => {
    try {
      loader.setLoader(true);
      const carteiras = await ApiService.listarCarteira(
        CacheService.get(StorageKeys.IdCliente)
      );
      setCarteiras(carteiras.data);
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const listarAcoes = async () => {
    try {
      loader.setLoader(true);
      const resultado = await ApiService.listarAcao();
      setAcoes(resultado);
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const renderizarCampoAcao = () => {
    var ativoAcoes = ativos
      .filter(item => {
        return item.tipo_cadastro !== 'R';
      })
      .map(item => item.acao_id);
    var res = acoes.filter(item => !ativoAcoes.includes(item.idAcao));
    setAcoesCombo(res);
  };

  const adicionarEditarAtivo = async () => {
    try {
      loader.setLoader(true);
      await ApiService.adicionarEditarAtivo(idCarteira, ativos);
      NotificationService.showSuccessAlert(
        toast,
        'Registro atualizado com sucesso!'
      );
      await listarAtivos(idCarteira);
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const limparForm = () => {
    setModoEditar(false);
    setHabilitaCampoAcao(false);
    reset({ idAtivo: 0, acao: '', cotacaoAtual: '', objetivo: '' });
  };

  const listarAtivos = async idCarteira => {
    document.getElementById('btLimpar').click();
    if (idCarteira) {
      setIdCarteira(idCarteira);
      setHabilitaDesabilitaFormulario(false);
      setHabilitaCampoAcao(false);
      try {
        loader.setLoader(true);
        const resultado = await ApiService.listarAtivos(
          CacheService.get(StorageKeys.IdCliente),
          idCarteira
        );
        if (resultado.length > 0) {
          let novoArray = resultado.map(e => {
            e.tipo_cadastro = 'E';
            e.cliente_id = CacheService.get(StorageKeys.IdCliente);
            e.codigo = e.acao.codigo;
            return e;
          });
          setAtivos(novoArray);
        } else {
          setAtivos([]);
        }
      } catch (error) {
        NotificationService.showApiResponseErrorAlert(toast, error.response);
      } finally {
        loader.setLoader(false);
      }
    } else {
      setAtivos([]);
      setIdCarteira('');
      setHabilitaDesabilitaFormulario(true);
      setHabilitaCampoAcao(true);
    }
  };

  const onSubmit = values => {
    if (modoEditar) {
      var ativo = ativos.find(
        a => a.id === values.idAtivo && a.acao_id === parseInt(values.acao)
      );
      ativo.objetivo = parseInt(values.objetivo);
      ativo.cotacao_atual = values.cotacaoAtual;
      setAtivos(ativos);
    } else {
      const ativo = {
        id: 0,
        tipo_cadastro: 'N',
        acao_id: parseInt(values.acao),
        codigo: acoes.find(a => a.idAcao === parseInt(values.acao)).codigoAcao,
        objetivo: parseInt(values.objetivo),
        cotacao_atual: values.cotacaoAtual,
        quantidade: 0,
        carteira_id: parseInt(idCarteira),
        cliente_id: parseInt(CacheService.get(StorageKeys.IdCliente)),
      };
      setAtivos([...ativos, ativo]);
    }

    document.getElementById('btLimpar').click();
  };

  const editarAtivo = ativo => {
    setAcoesCombo(acoes);
    setTimeout(() => {
      setModoEditar(true);
      setHabilitaCampoAcao(true);
      setValue('idAtivo', ativo.id);
      setValue('acao', ativo.acao_id);
      setValue('cotacaoAtual', ativo.cotacao_atual);
      setValue('objetivo', ativo.objetivo);
    }, '300');
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
        <Stack spacing={3} mx={'auto'} py={3} px={6}>
          <Stack>
            <Select
              id="carteira"
              name="carteira"
              placeholder="Selecione uma carteira"
              width={'250px'}
              bg={useColorModeValue('white', 'gray.700')}
              onChange={e => listarAtivos(e.target.value)}
            >
              {carteiras.map(c => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                );
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
                    <FormControl id="idAtivo">
                      <FormLabel>ID</FormLabel>
                      <Input
                        id="idAtivo"
                        width={'55px'}
                        disabled={true}
                        defaultValue={0}
                        {...register('idAtivo')}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      id="acao"
                      isInvalid={errors.acao}
                      isDisabled={habilitaCampoAcao}
                    >
                      <FormLabel>AÇÃO</FormLabel>
                      <Select
                        id="acao"
                        {...register('acao')}
                        placeholder="Selecione"
                        width={'250px'}
                      >
                        {acoesCombo.map((a, index) => {
                          return (
                            <option key={index} value={a.idAcao}>
                              {a.codigoAcao}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage>
                        {errors.acao && errors.acao.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      id="cotacaoAtual"
                      isInvalid={errors.cotacaoAtual}
                      isDisabled={habilitaDesabilitaFormulario}
                    >
                      <FormLabel>COTAÇÃO ATUAL (R$)</FormLabel>
                      <Input
                        id="cotacaoAtual"
                        name="cotacaoAtual"
                        type="number"
                        step="any"
                        {...register('cotacaoAtual')}
                      ></Input>
                      <FormErrorMessage>
                        {errors.cotacaoAtual && errors.cotacaoAtual.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl
                      id="objetivo"
                      isInvalid={errors.objetivo}
                      isDisabled={habilitaDesabilitaFormulario}
                    >
                      <FormLabel>OBJETIVO (%)</FormLabel>
                      <Input
                        id="objetivo"
                        name="objetivo"
                        type="number"
                        step="any"
                        {...register('objetivo')}
                      ></Input>
                      <FormErrorMessage>
                        {errors.objetivo && errors.objetivo.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>
                <HStack
                  marginTop={'10px'}
                  justify={'flex-end'}
                  direction={'row'}
                >
                  <Button
                    id="btLimpar"
                    onClick={() => limparForm()}
                    colorScheme="blue"
                    size="sm"
                    disabled={habilitaDesabilitaFormulario}
                  >
                    Limpar
                  </Button>
                  <Button
                    id="btAdicionar"
                    colorScheme="blue"
                    size="sm"
                    type="submit"
                    disabled={habilitaDesabilitaFormulario}
                  >
                    {modoEditar ? 'Editar' : 'Adicionar'}
                  </Button>
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
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th textAlign={'center'}>ID</Th>
                      <Th textAlign={'center'}>AÇÃO</Th>
                      <Th textAlign={'center'}>COTAÇÃO ATUAL (R$)</Th>
                      <Th textAlign={'center'}>OBJETIVO (%)</Th>
                      <Th textAlign={'center'}>OPÇÕES</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {ativos.map((a, index) => {
                      if (a.tipo_cadastro === 'N' || a.tipo_cadastro === 'E') {
                        return (
                          <Tr key={index}>
                            <Td textAlign={'center'}>{a.id}</Td>
                            <Td textAlign={'center'}>{a.codigo}</Td>
                            <Td textAlign={'center'}>R$ {a.cotacao_atual}</Td>
                            <Td textAlign={'center'}>{a.objetivo}%</Td>
                            <Td textAlign={'center'}>
                              <Button
                                colorScheme="blue"
                                size="sm"
                                margin={'2px'}
                                onClick={() => editarAtivo(a)}
                              >
                                Editar
                              </Button>
                              <Button
                                onClick={() => {
                                  onOpen();
                                  setAtivoDeletado(a);
                                }}
                                colorScheme="red"
                                size="sm"
                                margin={'2px'}
                              >
                                Excluir
                              </Button>
                            </Td>
                          </Tr>
                        );
                      }

                      return <Tr key={a.codigo}></Tr>;
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
          <HStack justify={'center'} direction={'row'}>
            <Button
              marginTop={'20px'}
              colorScheme="blue"
              size="sm"
              disabled={habilitaDesabilitaFormulario}
              onClick={() => adicionarEditarAtivo()}
            >
              Salvar Ativo(s)
            </Button>
          </HStack>
        </Stack>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Ativo
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja excluir este ativo?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  processarDelete();
                  onClose();
                }}
                ml={3}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default GerenciarAtivos;
