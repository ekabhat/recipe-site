import { Box, Flex, Link, Button, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={3}>
      <Flex maxW="container.xl" mx="auto" align="center" justify="space-between">
        <Heading as={RouterLink} to="/" size="lg" color="white">
          Recipe Finder
        </Heading>
        <Flex gap={4}>
          <Link as={RouterLink} to="/" color="white" _hover={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/recipes" color="white" _hover={{ textDecoration: 'none' }}>
            Recipes
          </Link>
          <Button
            as={RouterLink}
            to="/create"
            colorScheme="whiteAlpha"
            variant="outline"
            size="sm"
          >
            Create Recipe
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 