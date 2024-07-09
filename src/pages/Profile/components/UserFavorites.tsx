import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import favoriteService from '../../../services/favoriteService';
import { Recipe } from '../../../services/recipeService';
import { Container, Card, CircularProgress, Alert, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';

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
        <List>
          {favorites.map((recipe) => (
            <ListItem key={recipe.id} divider>
              <ListItemText primary={recipe.title} />
              <ListItemSecondaryAction sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleViewDetails(recipe.id)}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDelete(recipe.id)}
                >
                  Cancel
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default UserFavorites;
