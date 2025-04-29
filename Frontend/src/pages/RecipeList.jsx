import { useState, useEffect } from 'react';
import { Box, Container, SimpleGrid, Heading, Text, Card, CardBody, CardFooter, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRecipes = async () => {
      try {
        // Simulated data for now
        const mockRecipes = [
          {
            id: 1,
            title: 'Spaghetti Carbonara',
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
            description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper'
          },
          {
            id: 2,
            title: 'Chicken Curry',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
            description: 'Spicy Indian curry with tender chicken pieces'
          }
        ];
        setRecipes(mockRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        All Recipes
      </Heading>
      {loading ? (
        <Text textAlign="center">Loading recipes...</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {recipes.map((recipe) => (
            <Card key={recipe.id} overflow="hidden" variant="outline">
              <Image
                src={recipe.image}
                alt={recipe.title}
                objectFit="cover"
                height="200px"
              />
              <CardBody>
                <Heading size="md">{recipe.title}</Heading>
                <Text mt={2}>{recipe.description}</Text>
              </CardBody>
              <CardFooter>
                <Button
                  as={Link}
                  to={`/recipes/${recipe.id}`}
                  colorScheme="teal"
                  variant="solid"
                  width="full"
                >
                  View Recipe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default RecipeList; 