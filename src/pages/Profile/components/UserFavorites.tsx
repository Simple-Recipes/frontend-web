import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import favoriteService from '../../../services/favoriteService';
import { Recipe } from '../../../services/recipeService';
import { Container, Card, CircularProgress, Alert, Typography, Box, Button } from '@mui/material';

const UserFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteRecipes = await favoriteService.getAllMyFavorites();
        setFavorites(favoriteRecipes);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        setError('Error fetching favorite recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleViewDetails = (id: number) => {
    history.push(`/recipes/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await favoriteService.removeFromFavorites(id);
      setFavorites(favorites.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting favorite recipe:', error);
      setError('Error deleting favorite recipe');
    }
  };

  if (loading) return <CircularProgress />;

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" component="div" gutterBottom>
          My Favorite Recipes
        </Typography>
        {favorites.map((recipe) => (
          <Box key={recipe.id} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{recipe.title}</Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleViewDetails(recipe.id)}
                sx={{ mr: 2 }}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Card>
    </Container>
  );
};

export default UserFavorites;
