import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const PaginaNaoEncontrada = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate('/');
  };
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading display="inline-block" as="h2" size="2xl">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página não encontrada.
      </Text>

      <Button
        bg={'blue.400'}
        color={'white'}
        _hover={{
          bg: 'blue.500',
        }}
        onClick={() => login()}
      >
        Voltar para o login
      </Button>
    </Box>
  );
};

export default PaginaNaoEncontrada;
