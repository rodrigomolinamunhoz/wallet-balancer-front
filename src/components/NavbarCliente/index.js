import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { CacheService } from '../../services/CacheService';
import { StorageKeys } from '../../constants/StorageKeys';

const NavbarCliente = () => {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState('');

  useEffect(() => {
    setUsuarioLogado(CacheService.get(StorageKeys.LoggedUser));
  }, []);

  const inicio = () => {
    navigate('/painel-cliente');
  };

  const gerenciarCarteiras = () => {
    navigate('/gerenciar-carteiras');
  };

  const gerenciarAtivos = () => {
    navigate('/gerenciar-ativos');
  };

  const sair = () => {
    CacheService.removeAll();
    navigate('/');
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Image htmlHeight={50} htmlWidth={50} src="./LogoWB.png" alt="Logo" />
        <Flex flex={{ base: 1 }} justify={{ md: 'start' }}>
          <Stack direction={'row'} spacing={4}>
            <Button
              onClick={() => inicio()}
              p={2}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              fontFamily={'heading'}
              variant={'link'}
              paddingLeft={6}
            >
              Início
            </Button>
            <Button
              onClick={() => gerenciarCarteiras()}
              p={2}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              fontFamily={'heading'}
              variant={'link'}
            >
              Gerenciar Carteiras
            </Button>
            <Button
              onClick={() => gerenciarAtivos()}
              p={2}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              fontFamily={'heading'}
              variant={'link'}
            >
              Gerenciar Ativos
            </Button>
          </Stack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            {usuarioLogado}
          </Text>
          <Button
            onClick={() => sair()}
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'#'}
          >
            Sair
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default NavbarCliente;
