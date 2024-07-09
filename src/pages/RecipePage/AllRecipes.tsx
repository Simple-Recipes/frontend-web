import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Typography, CircularProgress, Alert, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import recipeService, { Recipe, PageResult } from "../../services/recipeService";
import CustomPagination from "../../components/Pagination";
import ViewDetailsButton from "../../components/ViewDetailsButton";

const AllRecipes: React.FC = () => {
  const history = useHistory();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10; // 每页显示的记录数

  useEffect(() => {
    const fetchAllRecipes = async (page: number) => {
      try {
        setLoading(true);
        const data: PageResult = await recipeService.fetchAllRecipes(page, pageSize);

        console.log("Response data:", data); // 记录响应数据

        setRecipes(data.records || []);
        setTotal(data.total || 0);
        console.log("Recipes set successfully");
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipes(currentPage);
  }, [currentPage, history]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        All Recipes
      </Typography>
      <List>
        {recipes.length > 0 ? recipes.map((recipe) => (
          <ListItem key={recipe.id} alignItems="flex-start">
            <ListItemText
              primary={
                <Typography variant="h6" component="div">
                  {recipe.title}
                </Typography>
              }
              secondary={
                <>
                  {/* <Typography variant="body2" color="textSecondary" component="p">
                    Ingredients: {recipe.ingredients.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Directions: {recipe.directions.join(" ")}
                  </Typography> */}
                  {recipe.link ? (
                    <img src={recipe.link} alt="Recipe" style={{ width: '200px', height: '200px' }} />
                  ) : (
                    <img src={require("./../../assets/Image/1.png")} alt="Fallback Image" style={{ width: '100%', height: 'auto' }} />
                  )}
                </>
              }
            />
            <ViewDetailsButton recipeId={recipe.id} />
          </ListItem>
        )) : (
          <Typography variant="body1" align="center" mt={5}>
            No recipes found.
          </Typography>
        )}
      </List>
      <Box display="flex" justifyContent="center" mt={4}>
        <CustomPagination
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default AllRecipes;
