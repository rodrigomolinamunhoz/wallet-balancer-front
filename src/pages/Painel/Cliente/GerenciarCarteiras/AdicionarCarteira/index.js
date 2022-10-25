import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarCliente from '../../../../../components/NavbarCliente';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

const AdicionarCarteira = () => {

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
                            <form>
                                <FormControl id="nomeCarteira">
                                    <FormLabel textAlign={'center'} marginBottom={'20px'}>Informe o nome da sua nova carteira</FormLabel>
                                    <Input id="nomeCarteira" />
                                </FormControl>

                                <Stack direction={{ base: 'column', sm: 'row' }} justify={'center'} marginTop={'20px'}>

                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type="submit"
                                    >
                                        Adicionar
                                    </Button>
                                    <Button
                                        onClick={() => voltar()}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        type="submit"
                                    >
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