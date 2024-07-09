import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import recipeService, { Recipe } from "../../../services/recipeService";
import { Container, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import ViewDetailsButton from "../../../components/ViewDetailsButton";

const PopularRecipes: React.FC = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          setError("No token found");
          setLoading(false);
          return;
        }

        console.log("Token:", token); // 验证token在控制台中
        const data = await recipeService.fetchPopularRecipes();

        console.log("Response data:", data); // 记录响应数据

        setRecipes(data.records);
        console.log("Recipes set successfully");
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the popular recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularRecipes();
  }, [history]);

  const handleViewDetails = (recipeId: number) => {
    history.push(`/recipes/${recipeId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Typography variant="h5" align="center" mt={5}>
          Loading...
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box mt={5}>
          <Alert severity="error">
            {error}
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Popular Recipes
      </Typography>
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} alignItems="flex-start">
            <ListItemText
              primary={
                <Typography variant="h6" component="div">
                  {recipe.title}
                </Typography>
              }
              secondary={
                <>
                  {/* 其他的次要信息可以放在这里 */}
                </>
              }
            />
            <ViewDetailsButton recipeId={recipe.id} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PopularRecipes;
