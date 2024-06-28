import React, { useState, useEffect } from 'react';
import likeService from '../../../services/likeService';
import { Recipe } from '../../../services/recipeService';
import { useHistory } from 'react-router-dom';
import { Container, Card, CircularProgress, Alert, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@mui/material';
import userService from '../../../services/userService';

const UserLikes: React.FC = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        const likedRecipesData = await likeService.getAllMyLikes();
        setLikedRecipes(likedRecipesData);
      } catch (error) {
        console.error('Error fetching liked recipes:', error);
        setError('Error fetching liked recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, []);

  const handleViewDetails = (id: number) => {
    history.push(`/recipes/${id}`);
  };

  const handleUnlike = async (recipeId: number) => {
    try {
      const userId = (await userService.getUserProfile()).id;
      await likeService.unlikeRecipe({ userId, recipeId });
      setLikedRecipes(likedRecipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error unliking recipe:', error);
      setError('Error unliking recipe');
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
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }} >
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" component="div" gutterBottom>
          Liked Recipes
        </Typography>
        <List>
          {likedRecipes.map((recipe) => (
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
                  onClick={() => handleUnlike(recipe.id)}
                >
                  Unlike
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default UserLikes;
