import React from 'react';
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
    useColorModeValue,
    Box,
    Divider,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const ListarCarteiras = () => {

    const navigate = useNavigate();

    const excluir = () => {
        navigate('/gerenciar-carteiras/excluir');
    };

    const adicionarCarteira = () => {
        navigate('/gerenciar-carteiras/adicionar');
    };

    return (
        <>
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
                        width={800}
                    >
                        <Button onClick={() => adicionarCarteira()} colorScheme='blue' size='sm' marginBottom={'20px'} marginLeft={'20px'}>Adicionar</Button>
                        <Divider />
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>CARTEIRA</Th>
                                        <Th textAlign={'center'}>OPÇÕES</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Carteira01</Td>
                                        <Td textAlign={'center'}><Button onClick={() => excluir()} colorScheme='red' size='sm'>Excluir</Button></Td>
                                    </Tr >
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default ListarCarteiras;