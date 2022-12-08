import React, { useState, useEffect } from 'react';
import NavbarCliente from '../../../components/NavbarCliente';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  Select,
  Stack,
  Flex,
  useColorModeValue,
  Text,
  Input,
  FormControl,
  HStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  VStack,
  useToast,
  TableCaption,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  FormLabel,
  FormErrorMessage,
  Tfoot,
} from '@chakra-ui/react';
import ApiService from '../../../services/ApiService';
import { CacheService } from '../../../services/CacheService';
import { StorageKeys } from '../../../constants/StorageKeys';
import NotificationService from '../../../services/NotificationService';
import { useLoader } from '../../../context/loaderProvider';

const schema = yup
  .object({
    tipoCompra: yup.string().required('Campo obrigatório!'),
    acao: yup.string().required('Campo obrigatório!'),
    quantidade: yup
      .string()
      .transform(value => (isNaN(value) ? 0 : value))
      .matches(/^[1-9]\d*$/, 'Quantidade inválida!')
      .required('Campo obrigatório!'),
  })
  .required();

const PainelCliente = () => {
  const toast = useToast();
  const loader = useLoader();
  const [carteiras, setCarteiras] = useState([]);
  const [patrimonio, setPatrimonio] = useState(0);
  const [ativos, setAtivos] = useState([]);
  const [ativosFiltrados, setAtivosFiltrados] = useState([]);
  const [setores, setSetores] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [habilitaCamposAporte, setHabilitaCamposAporte] = useState(true);
  const [habilitaBotaoCompraSugerida, setHabilitaBotaoCompraSugerida] =
    useState(false);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [idCarteira, setIdCarteira] = useState(0);
  const {
    isOpen: isOpenAporte,
    onOpen: onOpenAporte,
    onClose: onCloseAporte,
  } = useDisclosure();
  const {
    isOpen: isOpenHistorico,
    onOpen: onOpenHistorico,
    onClose: onCloseHistorico,
  } = useDisclosure();
  const {
    isOpen: isOpenMovimentacao,
    onOpen: onOpenMovimentacao,
    onClose: onCloseMovimentacao,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (ativos.length > 0) {
      setHabilitaCamposAporte(false);
    } else {
      setHabilitaCamposAporte(true);
    }

    const temQuantidadeCompra = ativos.find(element => {
      return element.quantidade_compra > 0;
    });
    setHabilitaBotaoCompraSugerida(Boolean(temQuantidadeCompra));
  }, [ativos]);

  useEffect(() => {
    listarCarteira();
    listarSetores();
  }, []);

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

  const listarSetores = async () => {
    try {
      loader.setLoader(true);
      const setores = await ApiService.listarSetores();
      setSetores(setores);
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const listarAtivos = async idCarteira => {
    if (idCarteira) {
      try {
        loader.setLoader(true);
        setIdCarteira(idCarteira);
        const resultado = await ApiService.listarBalanceador(
          CacheService.get(StorageKeys.IdCliente),
          idCarteira
        );
        setAtivos(resultado.ativos);
        setAtivosFiltrados(resultado.ativos);
        setPatrimonio(resultado.patrimonio);
      } catch (error) {
        NotificationService.showApiResponseErrorAlert(toast, error.response);
      } finally {
        loader.setLoader(false);
      }
    } else {
      setAtivos([]);
      setAtivosFiltrados([]);
      setPatrimonio(0);
      setIdCarteira(0);
    }
  };

  const filtrarAtivos = async idSetor => {
    if (idSetor === '') {
      setAtivosFiltrados(ativos);
    } else {
      const listaFiltrada = ativos.filter(item => {
        return item.setor_id === parseInt(idSetor);
      });
      setAtivosFiltrados(listaFiltrada);
    }
  };

  const listarHistorico = async idCarteira => {
    if (idCarteira) {
      try {
        loader.setLoader(true);
        const resultado = await ApiService.listarHistorico(
          CacheService.get(StorageKeys.IdCliente),
          idCarteira
        );

        setHistorico(resultado);
      } catch (error) {
        NotificationService.showApiResponseErrorAlert(toast, error.response);
      } finally {
        loader.setLoader(false);
      }
    } else {
      setHistorico([]);
    }
  };

  const verificaRealizarAporte = () => {
    var valor = document.getElementById('valorAporte').value;
    if (valor === '0' || valor === '') {
      NotificationService.showErrorAlert(
        toast,
        'O valor do aporte deve ser maior que ZERO'
      );
    } else if (parseInt(valor) < 0) {
      NotificationService.showErrorAlert(
        toast,
        'O valor do aporte não pode ser negativo'
      );
    } else {
      onOpenAporte();
    }
  };

  const onSubmit = values => {
    const ativo = ativos.find(a => {
      return a.id === parseInt(values.acao);
    });
    const movimentacao = {
      ativo_id: ativo.id,
      acao_id: ativo.acao_id,
      codigo_acao: ativo.codigo_acao,
      tipo_compra: parseInt(values.tipoCompra),
      quantidade: parseInt(values.quantidade),
      carteira_id: ativo.carteira_id,
      cliente_id: ativo.cliente_id,
    };
    setMovimentacoes([...movimentacoes, movimentacao]);
    limparFormMovimentacao();
  };

  const excluirMovimentacao = id => {
    const movimentacoesFiltradas = movimentacoes.filter(m => {
      return m.id !== id;
    });
    setMovimentacoes(movimentacoesFiltradas);
  };

  const salvarMovimentacoes = async () => {
    try {
      loader.setLoader(true);
      await ApiService.compraVenda(movimentacoes);
      NotificationService.showSuccessAlert(
        toast,
        'Registro adicionado com sucesso!'
      );
      setMovimentacoes([]);
      limparFormMovimentacao();
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const balancearAtivos = async () => {
    var valor = document.getElementById('valorAporte').value;
    try {
      loader.setLoader(true);
      const resultado = await ApiService.balancearAtivos(
        CacheService.get(StorageKeys.IdCliente),
        idCarteira,
        valor
      );
      setAtivos(resultado.ativos);
      setAtivosFiltrados(resultado.ativos);
      setPatrimonio(resultado.patrimonio);
      NotificationService.showSuccessAlert(
        toast,
        'Quantidade de compra atualizada com sucesso!'
      );
      document.getElementById('valorAporte').value = '';
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  const compraSugerida = async () => {
    setMovimentacoes([]);

    const movimentacoesSugeridas = ativos
      .filter(i => i.quantidade_compra > 0)
      .map(a => {
        return {
          ativo_id: a.id,
          acao_id: a.acao_id,
          codigo_acao: a.codigo_acao,
          tipo_compra: 1,
          quantidade: a.quantidade_compra,
          carteira_id: a.carteira_id,
          cliente_id: a.cliente_id,
        };
      });

    setMovimentacoes(movimentacoesSugeridas);
    onOpenMovimentacao();
    document.getElementById('valorAporte').value = '';
  };

  const limparFormMovimentacao = () => {
    reset({ tipoCompra: '', acao: '', quantidade: '' });
  };

  const limparCampoFiltroSetor = () => {
    document.getElementById('filtroSetor').value = '';
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
        <VStack>
          <HStack spacing={280} mx={'auto'} py={3} px={6}>
            <HStack>
              <Select
                id="carteira"
                name="carteira"
                placeholder="Selecione uma carteira"
                width={'250px'}
                bg={useColorModeValue('white', 'gray.700')}
                onChange={async e => {
                  await listarAtivos(e.target.value);
                  await listarHistorico(e.target.value);
                  limparCampoFiltroSetor();
                }}
              >
                {carteiras.map(c => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  );
                })}
              </Select>
              <Text>Patrimônio= R$ {patrimonio.toFixed(2)}</Text>
            </HStack>
            <Stack>
              <FormControl id="informarAporte">
                <Input
                  id="valorAporte"
                  width={'25'}
                  placeholder={'Informar Aporte'}
                  type="number"
                  step="any"
                  disabled={habilitaCamposAporte}
                />
                <Button
                  colorScheme="blue"
                  margin={'15px'}
                  marginBottom={'20px'}
                  disabled={habilitaCamposAporte}
                  onClick={() => {
                    verificaRealizarAporte();
                  }}
                >
                  CALCULAR
                </Button>
              </FormControl>
            </Stack>
          </HStack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={5}
          >
            <TableContainer>
              <Table variant="simple" size="sm">
                {carteiras.length === 0 ? (
                  <TableCaption>
                    Adicione uma carteira, pelo menu "Gerenciar Carteiras"
                  </TableCaption>
                ) : (
                  <></>
                )}
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>AÇÃO</Th>
                    <Th textAlign={'center'}>SETOR</Th>
                    <Th textAlign={'center'}>QTD</Th>
                    <Th textAlign={'center'}>COTAÇÃO ATUAL</Th>
                    <Th textAlign={'center'}>PATRIMÔNIO</Th>
                    <Th textAlign={'center'}>PARTICIPAÇÃO ATUAL</Th>
                    <Th textAlign={'center'}>OBJETIVO</Th>
                    <Th textAlign={'center'}>DISTÂNCIA</Th>
                    <Th textAlign={'center'}>QTD COMPRA</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ativosFiltrados.map((a, index) => {
                    return (
                      <Tr key={index}>
                        <Td textAlign={'center'}>{a.codigo_acao}</Td>
                        <Td textAlign={'center'}>{a.descricao_setor}</Td>
                        <Td textAlign={'center'}>{a.quantidade}</Td>
                        <Td textAlign={'center'}>
                          R$ {a.cotacao_atual.toFixed(2)}
                        </Td>
                        <Td textAlign={'center'}>
                          R$ {a.patrimonio.toFixed(2)}
                        </Td>
                        <Td textAlign={'center'}>
                          {a.participacao_atual.toFixed(2)}%
                        </Td>
                        <Td textAlign={'center'}>{a.objetivo}%</Td>
                        <Td textAlign={'center'}>
                          {a.distancia_objetivo.toFixed(2)}%
                        </Td>
                        <Td textAlign={'center'}>{a.quantidade_compra}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                {habilitaBotaoCompraSugerida ? (
                  <Tfoot>
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          size="xs"
                          onClick={async () => await compraSugerida()}
                        >
                          COMPRA SUGERIDA
                        </Button>
                      </Td>
                    </Tr>
                  </Tfoot>
                ) : (
                  <></>
                )}
              </Table>
            </TableContainer>
          </Box>
          <HStack spacing={45} mx={'auto'} py={3} px={6}>
            <HStack>
              <Text>Filtrar ativos por setor:</Text>
              <Select
                id="filtroSetor"
                name="filtroSetor"
                placeholder="Selecione o setor"
                width={'250px'}
                align={'left'}
                disabled={habilitaCamposAporte}
                onChange={e => {
                  filtrarAtivos(e.target.value);
                }}
                bg={useColorModeValue('white', 'gray.700')}
              >
                {setores.map(s => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.descricao}
                    </option>
                  );
                })}
              </Select>
            </HStack>
            <HStack>
            <Button
                colorScheme="blue"
                margin={'2px'}
                disabled={habilitaCamposAporte}
                onClick={() => {
                  NotificationService.showSuccessAlert(
                    toast,
                    'Te puxa ai mano veio!'
                  );
                }}
              >
                ATUALIZAR COTAÇÕES
              </Button>
              <Button
                colorScheme="blue"
                margin={'2px'}
                disabled={habilitaCamposAporte}
                onClick={() => {
                  onOpenHistorico();
                }}
              >
                HISTÓRICO
              </Button>
              <Button
                colorScheme="blue"
                margin={'2px'}
                disabled={habilitaCamposAporte}
                onClick={() => {
                  limparFormMovimentacao();
                  onOpenMovimentacao();
                }}
              >
                INFORMAR NOVA MOVIMENTAÇÃO
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </Flex>

      <AlertDialog
        isOpen={isOpenAporte}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAporte}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ATENÇÃO
            </AlertDialogHeader>
            <AlertDialogBody>
              Verifique se a cotação dos ativos está atualizada.{<br />}
              Você tem certeza que deseja seguir com esta ação?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                colorScheme="gray"
                onClick={onCloseAporte}
              >
                Voltar
              </Button>
              <Button
                colorScheme="blue"
                onClick={async () => {
                  onCloseAporte();
                  await balancearAtivos();
                }}
                ml={3}
              >
                Sim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpenHistorico} scrollBehavior={'inside'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            HISTÓRICO DE MOVIMENTAÇÕES
          </ModalHeader>
          <ModalBody>
            <Divider />
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>AÇÃO</Th>
                    <Th textAlign={'center'}>DATA</Th>
                    <Th textAlign={'center'}>TIPO</Th>
                    <Th textAlign={'center'}>QUANTIDADE</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {historico.map((h, index) => {
                    return (
                      <Tr key={index}>
                        <Td textAlign={'center'}>{h.acao.codigo}</Td>
                        <Td textAlign={'center'}>
                          {moment(h.created_at).format('DD/MM/YYYY')}
                        </Td>
                        <Td textAlign={'center'}>
                          {h.tipo_compra === 1 ? 'Compra' : 'Venda'}
                        </Td>
                        <Td textAlign={'center'}>{h.quantidade}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onCloseHistorico}>
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenMovimentacao}>
        <ModalOverlay />
        <ModalContent maxWidth={'800px'} overflowY={'auto'}>
          <ModalHeader textAlign={'center'}>
            INFORMAR NOVA MOVIMENTAÇÃO
          </ModalHeader>
          <ModalBody>
            <Divider />

            <form onSubmit={handleSubmit(onSubmit)}>
              <HStack alignItems={'bottom'} spacing={'4'}>
                <FormControl id="tipoCompra" isInvalid={errors.tipoCompra}>
                  <FormLabel paddingTop={'2'}>Tipo</FormLabel>
                  <Select
                    id="tipoCompra"
                    placeholder="Selecione"
                    {...register('tipoCompra')}
                  >
                    <option value={1}>COMPRA</option>
                    <option value={2}>VENDA</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.tipoCompra && errors.tipoCompra.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="acao" isInvalid={errors.acao}>
                  <FormLabel paddingTop={'2'}>Ação</FormLabel>
                  <Select
                    id="acao"
                    placeholder="Selecione"
                    {...register('acao')}
                  >
                    {ativos.map((a, index) => {
                      return (
                        <option key={index} value={a.id}>
                          {a.codigo_acao}
                        </option>
                      );
                    })}
                  </Select>
                  <FormErrorMessage>
                    {errors.acao && errors.acao.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="quantidade" isInvalid={errors.quantidade}>
                  <FormLabel paddingTop={'2'}>Quantidade</FormLabel>
                  <Input
                    type="number"
                    id="quantidade"
                    {...register('quantidade')}
                  />
                  <FormErrorMessage>
                    {errors.quantidade && errors.quantidade.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack>
                  <Button
                    colorScheme="blue"
                    size={'sm'}
                    mr={3}
                    marginTop={'48px'}
                    type="submit"
                  >
                    Adicionar
                  </Button>
                </Stack>
              </HStack>
            </form>
            <Divider height="30px" />
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>TIPO</Th>
                    <Th textAlign={'center'}>AÇÃO</Th>
                    <Th textAlign={'center'}>QUANTIDADE</Th>
                    <Th textAlign={'center'}>OPÇÕES</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {movimentacoes.map((m, index) => {
                    return (
                      <Tr key={index}>
                        <Td textAlign={'center'}>
                          {m.tipo_compra === 1 ? 'Compra' : 'Venda'}
                        </Td>
                        <Td textAlign={'center'}>{m.codigo_acao}</Td>
                        <Td textAlign={'center'}>{m.quantidade}</Td>
                        <Td textAlign={'center'}>
                          <Button
                            onClick={() => excluirMovimentacao(m.id)}
                            colorScheme="red"
                            size="sm"
                          >
                            Excluir
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={1}
              onClick={async () => {
                await salvarMovimentacoes();
                await listarAtivos(idCarteira);
                await listarHistorico(idCarteira);
                onCloseMovimentacao();
              }}
              disabled={movimentacoes.length === 0}
            >
              Salvar Movimentações
            </Button>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={() => {
                onCloseMovimentacao();
                setMovimentacoes([]);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PainelCliente;
