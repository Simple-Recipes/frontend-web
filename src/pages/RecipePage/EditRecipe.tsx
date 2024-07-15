import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Card, CardHeader, CardContent, TextField, Button, Alert, Box, Grid, Typography, CircularProgress } from '@mui/material';
import recipeService, { Recipe } from '../../services/recipeService';

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [link, setLink] = useState("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [nutrition, setNutrition] = useState("");
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      setIsLoggedIn(false);
      setDisplayWarning(true);
      return;
    }

    if (id) {
      fetchRecipeDetails(Number(id));
    }
  }, [id]);

  const fetchRecipeDetails = async (recipeId: number) => {
    try {
      const fetchedRecipe = await recipeService.fetchRecipeDetails(recipeId);
      setRecipe(fetchedRecipe);
      setTitle(fetchedRecipe.title);
      setIngredients(fetchedRecipe.ingredients.join(", "));
      setDirections(fetchedRecipe.directions.join(", "));
      setLink(fetchedRecipe.link || "");
      setMinutes(fetchedRecipe.minutes);
      setNutrition(fetchedRecipe.nutrition);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Failed to load recipe details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !ingredients || !directions || !link  || minutes === "" || !nutrition) {
      setDisplayWarning(true);
      return;
    }

    if (recipe) {
      const updatedRecipe = {
        ...recipe,
        title,
        ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
        directions: directions.split(",").map((direction) => direction.trim()),
        link,
        minutes: Number(minutes),
        nutrition,
      };

      try {
        await recipeService.editRecipe(updatedRecipe);
        setDisplaySuccess(true);
        setDisplayWarning(false);
        history.push(`/recipes/${recipe.id}`);
      } catch (error) {
        console.error('Error editing recipe:', error);
        setError('Failed to edit recipe');
        setDisplayWarning(true);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="warning">
          Users need to be logged in to edit a recipe.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {displaySuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Recipe updated successfully
        </Alert>
      )}
      {displayWarning && (
        <Alert severity="error" sx={{ mb: 3 }}>
          All fields must be filled out or user needs to be logged in
        </Alert>
      )}
      <Card>
        <CardHeader title="Edit Recipe" />
        <CardContent>
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ingredients (comma separated)"
                  required
                  onChange={(e) => setIngredients(e.target.value)}
                  value={ingredients}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Directions (comma separated)"
                  required
                  onChange={(e) => setDirections(e.target.value)}
                  value={directions}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Link"
                  required
                  onChange={(e) => setLink(e.target.value)}
                  value={link}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Minutes"
                  required
                  type="number"
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  value={minutes}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nutrition"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={nutrition}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    size="large"
                  >
                    Save Recipe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditRecipe;
