import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  HStack,
  Select,
  Text
} from '@chakra-ui/react';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [''],
    instructions: [''],
    prepTime: '',
    cookTime: '',
    servings: 1,
    difficulty: 'Easy'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      console.log('Submitting recipe:', formData);
      alert('Recipe created successfully!');
      navigate('/recipes');
    } catch (error) {
      alert('Failed to create recipe. Please try again.');
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <Heading as="h1" size="xl">
            Create New Recipe
          </Heading>

          <Box width="100%">
            <Text mb={2} fontWeight="medium">Recipe Title</Text>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter recipe title"
              isRequired
            />
          </Box>

          <Box width="100%">
            <Text mb={2} fontWeight="medium">Description</Text>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter recipe description"
              isRequired
            />
          </Box>

          <Box width="100%">
            <Text mb={2} fontWeight="medium">Image URL</Text>
            <Input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
            />
          </Box>

          <Box width="100%">
            <Text mb={2} fontWeight="medium">Ingredients</Text>
            <VStack spacing={2} align="stretch">
              {formData.ingredients.map((ingredient, index) => (
                <HStack key={index}>
                  <Input
                    value={ingredient}
                    onChange={(e) => handleArrayChange('ingredients', index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    isRequired
                  />
                  <Button
                    colorScheme="red"
                    onClick={() => removeArrayItem('ingredients', index)}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
              <Button onClick={() => addArrayItem('ingredients')}>
                Add Ingredient
              </Button>
            </VStack>
          </Box>

          <Box width="100%">
            <Text mb={2} fontWeight="medium">Instructions</Text>
            <VStack spacing={2} align="stretch">
              {formData.instructions.map((instruction, index) => (
                <HStack key={index}>
                  <Input
                    value={instruction}
                    onChange={(e) => handleArrayChange('instructions', index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    isRequired
                  />
                  <Button
                    colorScheme="red"
                    onClick={() => removeArrayItem('instructions', index)}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
              <Button onClick={() => addArrayItem('instructions')}>
                Add Step
              </Button>
            </VStack>
          </Box>

          <HStack spacing={4} width="100%">
            <Box flex={1}>
              <Text mb={2} fontWeight="medium">Prep Time (minutes)</Text>
              <Input
                name="prepTime"
                value={formData.prepTime}
                onChange={handleInputChange}
                type="number"
                min="0"
                isRequired
              />
            </Box>

            <Box flex={1}>
              <Text mb={2} fontWeight="medium">Cook Time (minutes)</Text>
              <Input
                name="cookTime"
                value={formData.cookTime}
                onChange={handleInputChange}
                type="number"
                min="0"
                isRequired
              />
            </Box>
          </HStack>

          <HStack spacing={4} width="100%">
            <Box flex={1}>
              <Text mb={2} fontWeight="medium">Servings</Text>
              <Input
                name="servings"
                type="number"
                min="1"
                value={formData.servings}
                onChange={handleInputChange}
                isRequired
              />
            </Box>

            <Box flex={1}>
              <Text mb={2} fontWeight="medium">Difficulty</Text>
              <Select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Select>
            </Box>
          </HStack>

          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="full"
          >
            Create Recipe
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreateRecipe; 