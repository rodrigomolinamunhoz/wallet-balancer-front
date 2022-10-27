import React, { useState, useRef, useEffect } from 'react';
import NavbarCliente from '../../../../components/NavbarCliente';
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Stack,
  TableCaption,
  useColorModeValue,
  Box,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../../services/ApiService';
import { CacheService } from '../../../../services/CacheService';
import { StorageKeys } from '../../../../constants/StorageKeys';
import { useLoader } from '../../../../context/loaderProvider';
import NotificationService from '../../../../services/NotificationService';

const GerenciarCarteiras = () => {
  const navigate = useNavigate();
  const loader = useLoader();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [idDelete, setidDelete] = useState(0);
  const [carteiras, setCarteiras] = useState([]);

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

  const deletarCarteira = async () => {
    try {
      loader.setLoader(true);
      await ApiService.deletarCarteira(idDelete);
      NotificationService.showSuccessAlert(
        toast,
        'Registro excluído com sucesso!'
      );
      listarCarteira();
    } catch (error) {
      NotificationService.showApiResponseErrorAlert(toast, error.response);
    } finally {
      loader.setLoader(false);
    }
  };

  useEffect(() => {
    listarCarteira();
  }, []);

  const adicionarCarteira = () => {
    navigate('/gerenciar-carteiras/adicionar');
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
            maxW="lg"
          >
            <Button
              onClick={() => adicionarCarteira()}
              colorScheme="blue"
              size="sm"
              marginBottom={'20px'}
              marginLeft={'20px'}
            >
              Adicionar
            </Button>
            <Divider />
            <TableContainer>
              <Table variant="simple">
                {carteiras.length === 0 ? (
                  <TableCaption>Nenhuma carteira cadastrada!</TableCaption>
                ) : (
                  <></>
                )}
                <Thead>
                  <Tr>
                    <Th>CARTEIRA</Th>
                    <Th textAlign={'center'}>OPÇÕES</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {carteiras.map(c => {
                    return (
                      <Tr key={c.id}>
                        <Td>{c.nome}</Td>
                        <Td textAlign={'center'}>
                          <Button
                            onClick={() => {
                              onOpen();
                              setidDelete(c.id);
                            }}
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
          </Box>
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
              Excluir Carteira
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja excluir esta carteira?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletarCarteira();
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

export default GerenciarCarteiras;
