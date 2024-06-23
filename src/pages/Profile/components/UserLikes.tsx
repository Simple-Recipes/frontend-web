import React, { useState, useEffect } from 'react';
import likeService from '../../../services/likeService';
import { Recipe } from '../../../services/recipeService';
import UserRecipes from './UserRecipes';
import { Container, Card, CircularProgress, Alert, Typography } from '@mui/material';

const UserLikes: React.FC = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <UserRecipes recipes={likedRecipes} setRecipes={setLikedRecipes} />
      </Card>
    </Container>
  );
};

export default UserLikes;
