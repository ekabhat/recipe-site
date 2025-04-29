import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxW="container.md" py={20}>
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" mb={8}>
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="teal"
          size="lg"
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound; 