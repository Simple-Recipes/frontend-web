import React from 'react';
import { useHistory } from 'react-router-dom';
import recipeService, { Recipe } from '../../../services/recipeService';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Box, Alert, Typography } from '@mui/material';

interface UserRecipesProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const UserRecipes: React.FC<UserRecipesProps> = ({ recipes, setRecipes }) => {
  const history = useHistory();
  const [error, setError] = React.useState<string | null>(null);

  const handleViewDetails = (id: number) => {
    history.push(`/recipes/${id}`);
  };

  const handleEdit = (id: number) => {
    history.push(`/recipes/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await recipeService.deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError('Error deleting recipe');
    }
  };

  return (
    <Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h6" component="div" gutterBottom>
        My Recipes
      </Typography>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} divider>
            <ListItemText primary={recipe.title} />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleViewDetails(recipe.id)}
                sx={{ mr: 2 }}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleEdit(recipe.id)}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserRecipes;
