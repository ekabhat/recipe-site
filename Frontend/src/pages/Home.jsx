import { Box, Heading, Text, Button, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center" py={10}>
        <Heading as="h1" size="2xl" mb={4}>
          Welcome to Recipe Finder
        </Heading>
        <Text fontSize="xl" mb={8}>
          Discover and share your favorite recipes
        </Text>
        <Button
          as={Link}
          to="/recipes"
          colorScheme="teal"
          size="lg"
          mr={4}
        >
          Browse Recipes
        </Button>
        <Button
          as={Link}
          to="/create-recipe"
          colorScheme="teal"
          variant="outline"
          size="lg"
        >
          Create Recipe
        </Button>
      </Box>
    </Container>
  );
};

export default Home; 