import React from 'react';
import NavbarCliente from '../../../../components/NavbarCliente';
import { FormControl, FormLabel, Input, Select, Stack, HStack, Box, Button, Flex } from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const GerenciarAtivos = () => {

  return <>
    <NavbarCliente />

    <Flex justify={'center'}>
      <Stack spacing={5} mx={'auto'} py={5} px={6}>
        <Stack>
          <Select placeholder='Selecione uma carteira' size='sm' width={'250px'}>
            <option value='option1'>Carteira 01</option>
          </Select>
        </Stack>
        <Stack backgroundColor={'gray.50'} padding={'20px'}>
          <form>
            <HStack spacing={'2'}>
              <Box>
                <FormControl id="cadastroAtivo">
                  <FormLabel>ATIVO</FormLabel>
                  <Input />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="cotacaoAtual">
                  <FormLabel>COTAÇÃO ATUAL</FormLabel>
                  <Input />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="objetivo">
                  <FormLabel>OBJETIVO</FormLabel>
                  <Input />
                </FormControl>
              </Box>
            </HStack>
            <HStack marginTop={'10px'} justify={'flex-end'} direction={'row'}>
              <Button colorScheme='blue' size='sm'>Limpar</Button>
              <Button colorScheme='blue' size='sm'>Adicionar</Button>
            </HStack>
          </form>
        </Stack>

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
      </Stack>
    </Flex>

  </>

};

export default GerenciarAtivos;
