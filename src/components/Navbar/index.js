import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';

const Navbar = () => {
  const navigate = useNavigate();
  const inicio = () => {
    navigate('/painel-analista');
  }
  const convidarCliente = () => {
    navigate('/convidar-cliente');
  }
  const sair = () => {
    navigate('/');
  }
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
            //color={linkColor}
            >
              Início
            </Button>
            <Button
              onClick={() => convidarCliente()}
              p={2}
              as={'a'}
              fontSize={'sm'}
              fontWeight={400}
              fontFamily={'heading'}
              variant={'link'}
            //color={linkColor}
            >
              Convidar Cliente
            </Button>
          </Stack>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Rodrigo
          </Text>
          <Button
            //onClick={() => logout()}
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

export default Navbar;
