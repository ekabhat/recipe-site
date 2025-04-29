import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Heading,
  Text,
  Image,
  List,
  ListItem,
  VStack,
  HStack,
  Badge,
  Icon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchRecipe = async () => {
      try {
        // Simulated data for now
        const mockRecipe = {
          id: parseInt(id),
          title: 'Spaghetti Carbonara',
          image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
          description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
          ingredients: [
            '400g spaghetti',
            '200g pancetta',
            '4 large eggs',
            '50g pecorino cheese',
            '50g parmesan',
            'Freshly ground black pepper',
            'Salt'
          ],
          instructions: [
            'Bring a large pot of salted water to boil',
            'Cook spaghetti according to package instructions',
            'Fry pancetta until crispy',
            'Beat eggs with grated cheese',
            'Mix everything together off the heat',
            'Season with black pepper'
          ],
          prepTime: '15 mins',
          cookTime: '15 mins',
          servings: 4,
          difficulty: 'Medium'
        };
        setRecipe(mockRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <Text textAlign="center">Loading recipe...</Text>;
  }

  if (!recipe) {
    return <Text textAlign="center">Recipe not found</Text>;
  }

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Image
            src={recipe.image}
            alt={recipe.title}
            borderRadius="lg"
            objectFit="cover"
            width="100%"
            height="400px"
          />
        </Box>

        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            {recipe.title}
          </Heading>
          <Text fontSize="xl" mb={4}>
            {recipe.description}
          </Text>
          <HStack spacing={4} mb={6}>
            <Badge colorScheme="green" fontSize="md">
              Prep: {recipe.prepTime}
            </Badge>
            <Badge colorScheme="orange" fontSize="md">
              Cook: {recipe.cookTime}
            </Badge>
            <Badge colorScheme="blue" fontSize="md">
              Servings: {recipe.servings}
            </Badge>
            <Badge colorScheme="purple" fontSize="md">
              {recipe.difficulty}
            </Badge>
          </HStack>
        </Box>

        <Box borderTop="1px" borderColor="gray.200" py={6} />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Ingredients
          </Heading>
          <List spacing={2}>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <Icon as={MdCheckCircle} color="green.500" mr={2} />
                {ingredient}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box borderTop="1px" borderColor="gray.200" py={6} />

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Instructions
          </Heading>
          <List spacing={4}>
            {recipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <Text>
                  <Text as="span" fontWeight="bold" mr={2}>
                    Step {index + 1}:
                  </Text>
                  {instruction}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default RecipeDetail; 