import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCliente from '../../../../../components/NavbarCliente';
import {
    Flex,
    Box,
    Stack,
    Button,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';

const ExcluirCarteira = () => {

    const navigate = useNavigate();

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
                <Stack spacing={8} mx={'auto'} py={3} px={6}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                        width={800}
                    >
                        <Stack spacing={4}>
                            <Text textAlign={'center'} marginBottom={'20px'}>Você tem certeza que deseja excluir a carteira X?</Text>
                            <Stack direction={{ base: 'column', sm: 'row' }} justify={'center'} marginTop={'20px'}>
                                <Button
                                    colorScheme='red'
                                    size='sm'
                                >
                                    Sim
                                </Button>
                                <Button
                                    onClick={() => voltar()}
                                    colorScheme='blue'
                                    size='sm'
                                >
                                    Voltar
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default ExcluirCarteira;