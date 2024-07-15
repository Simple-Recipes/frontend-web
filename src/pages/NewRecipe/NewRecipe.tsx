import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import recipeService from "../../services/recipeService";
import { Container, Card, CardHeader, CardContent, TextField, Button, MenuItem, Select, FormControl, InputLabel, Alert, Box, Grid, Typography } from '@mui/material';

const NewRecipe: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [link, setLink] = useState("");
  const [minutes, setMinutes] = useState<number | "">("");
  const [nutrition, setNutrition] = useState("");
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

  const handleSubmit = async () => {
    if (
      !title ||
      !ingredients ||
      !directions ||
      !link ||
      minutes === "" ||
      !nutrition
    ) {
      setDisplayWarning(true);
      return;
    }

    const recipe = {
      title,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      directions: directions.split(",").map((direction) => direction.trim()),
      link,
      minutes: Number(minutes),
      nutrition,//haha
    };

    console.log("Submitting recipe:", recipe);

    try {
      const response = await recipeService.publishRecipe(recipe);
      setDisplaySuccess(true);
      setDisplayWarning(false);
      console.log("Recipe published successfully:", response);
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
              {/* <Grid item xs={12} md={6}>
                <FormControl fullWidth required variant="outlined">
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    label="Source"
                  >
                    <MenuItem value="Family Recipe">Family Recipe</MenuItem>
                    <MenuItem value="Mom's Recipe">Mom's Recipe</MenuItem>
                    <MenuItem value="Quick Recipe">Quick Recipe</MenuItem>
                    <MenuItem value="Gathered">Gathered</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
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
                  onChange={(e) => setDirections(e.target.value)}
                  value={nutrition}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} >
                <Box textAlign="center" >
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
