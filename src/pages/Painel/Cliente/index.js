import React, { useState, useEffect } from 'react';
import NavbarCliente from '../../../components/NavbarCliente';
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
} from '@chakra-ui/react';
import ApiService from '../../../services/ApiService';
import { CacheService } from '../../../services/CacheService';
import { StorageKeys } from '../../../constants/StorageKeys';
import NotificationService from '../../../services/NotificationService';

const PainelCliente = () => {
    const toast = useToast();
    const [carteiras, setCarteiras] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

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
                            >
                                {carteiras.map(c => {
                                    return (<option key={c.id}> {c.nome} </option>);
                                })}
                            </Select>
                            <Text>Total Carteira= R$X,XX</Text>
                        </HStack>
                        <Stack>
                            <FormControl id="informarAporte">
                                <Input
                                    id="valorAporte"
                                    width={'25'}
                                    placeholder={'Informar Aporte'}
                                    type="number"
                                    step="any"
                                />
                                <Button colorScheme="blue" margin={'2px'} onClick={() => { onOpen(); }}>CALCULAR</Button>
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
                            <Table variant="simple" size='sm'>
                                {carteiras.length === 0 ? (
                                    <TableCaption>Adicione uma carteira, pelo menu "Gerenciar Carteiras"</TableCaption>
                                ) : (
                                    <></>
                                )}
                                <Thead>
                                    <Tr>
                                        <Th textAlign={'center'}>ATIVO</Th>
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
                                    <Tr>
                                        <Td textAlign={'center'}>ABEV3</Td>
                                        <Td textAlign={'center'}>Consumo não Cíclico</Td>
                                        <Td textAlign={'center'}>10</Td>
                                        <Td textAlign={'center'}>R$15,60</Td>
                                        <Td textAlign={'center'}>R$156,00</Td>
                                        <Td textAlign={'center'}>3,30%</Td>
                                        <Td textAlign={'center'}>10%</Td>
                                        <Td textAlign={'center'}>-6,70%</Td>
                                        <Td textAlign={'center'}>32,1</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <HStack spacing={250} mx={'auto'} py={3} px={6}>
                        <HStack>
                            <Text>Filtrar ativos por setor:</Text>
                            <Select
                                id="sFiltroSetor"
                                name="filtroSetor"
                                placeholder="Selecione o setor"
                                width={'250px'}
                                align={'left'}
                                bg={useColorModeValue('white', 'gray.700')}
                            >
                                <option>Setores dos ativos</option>
                            </Select>
                        </HStack>
                        <HStack>
                            <Button colorScheme="blue" margin={'2px'}>HISTÓRICO</Button>
                            <Button colorScheme="blue" margin={'2px'}>INFORMAR NOVA TRANSAÇÃO</Button>
                        </HStack>
                    </HStack>
                </VStack>
            </Flex>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Atenção
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Verifique se a cotação dos ativos está atualizada.{<br />}
                            Você tem certeza que deseja seguir com esta ação?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} colorScheme="blue" onClick={onClose}>
                                Não
                            </Button>
                            <Button colorScheme="blue" onClick={() => { onClose(); }} ml={3}>
                                Sim
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
};

export default PainelCliente;