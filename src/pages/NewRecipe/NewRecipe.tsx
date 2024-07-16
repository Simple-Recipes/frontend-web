import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Card, CardHeader, CardContent, TextField, Button, Alert, Box, Grid, Typography } from '@mui/material';
import recipeService, { NutritionArray } from "../../services/recipeService";

const NewRecipe: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [link, setLink] = useState("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [nutrition, setNutrition] = useState<NutritionArray>([0, 0, 0, 0, 0, 0, 0]);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (!token) {
      setIsLoggedIn(false);
      setDisplayWarning(true);
      return;
    }
  }, []);

  const handleNutritionChange = (index: number, value: number) => {
    setNutrition(prev => {
      const newNutrition: NutritionArray = [...prev] as NutritionArray;
      newNutrition[index] = value;
      return newNutrition;
    });
  };

  const handleSubmit = async () => {
    if (!title || !ingredients || !directions || !link || minutes === "" || !nutrition) {
      setDisplayWarning(true);
      return;
    }

    const recipe = {
      title,
      ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
      directions: directions.split(",").map((direction) => direction.trim()),
      link,
      minutes: Number(minutes),
      nutrition,
    };

    console.log("Submitting recipe:", recipe);

    try {
      const response = await recipeService.publishRecipe(recipe);
      setDisplaySuccess(true);
      setDisplayWarning(false);
      console.log("Recipe published successfully:", response);
      history.push(`/recipes/${response.id}`);
    } catch (error) {
      console.error("Error publishing recipe:", error);
      setDisplayWarning(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Alert severity="warning">
          Users need to be logged in to add a new recipe.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {displaySuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Recipe added successfully
        </Alert>
      )}
      {displayWarning && (
        <Alert severity="error" sx={{ mb: 3 }}>
          All fields must be filled out or user needs to be logged in
        </Alert>
      )}
      <Card>
        <CardHeader title="Add a new Recipe" />
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
                <Typography variant="h6">Nutrition</Typography>
                <TextField
                  fullWidth
                  label="Calories"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(0, Number(e.target.value))}
                  value={nutrition[0]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Total Fat (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(1, Number(e.target.value))}
                  value={nutrition[1]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Sugar (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(2, Number(e.target.value))}
                  value={nutrition[2]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Sodium (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(3, Number(e.target.value))}
                  value={nutrition[3]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Protein (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(4, Number(e.target.value))}
                  value={nutrition[4]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Saturated Fat (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(5, Number(e.target.value))}
                  value={nutrition[5]}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Carbohydrates (%DV)"
                  required
                  type="number"
                  onChange={(e) => handleNutritionChange(6, Number(e.target.value))}
                  value={nutrition[6]}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    size="large"
                  >
                    Add Recipe
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

export default NewRecipe;
