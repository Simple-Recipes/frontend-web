import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import CommentsList from "./CommentsList";
import recipeService, { Recipe } from "../../services/recipeService";
import Like from "./Like";
import FavoriteButton from "./FavoriteButton";
import { Container, Box, Typography, Link as MuiLink, CircularProgress, Alert, Card, CardContent } from '@mui/material';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await recipeService.fetchRecipeDetails(parseInt(id, 10));
        setRecipe(data);
      } catch (err) {
        setError("An error occurred while fetching the recipe details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={5}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {recipe && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {recipe.title}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Directions:</strong> {recipe.directions.join(" ")}
            </Typography>
            {recipe.link && (
              <Typography variant="body1" component="p" gutterBottom>
                <strong>Link:</strong>{" "}
                <MuiLink href={recipe.link} target="_blank" rel="noopener noreferrer">
                  {recipe.link}
                </MuiLink>
              </Typography>
            )}
            {recipe.source && (
              <Typography variant="body1" component="p" gutterBottom>
                <strong>Source:</strong> {recipe.source}
              </Typography>
            )}
            <Typography variant="body1" component="p" gutterBottom>
              <strong>NER:</strong> {recipe.ner.join(", ")}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Created At:</strong>{" "}
              {new Date(recipe.createTime).toLocaleString()}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              <strong>Updated At:</strong>{" "}
              {new Date(recipe.updateTime).toLocaleString()}
            </Typography>
            <Box mt={2}>
              <Like recipeId={parseInt(id, 10)} />
            </Box>
          </CardContent>
        </Card>
      )}

      <Box mt={5}>
        <CommentsList recipeId={parseInt(id, 10)} />
      </Box>
      <Box mt={2}>
        <FavoriteButton recipeId={parseInt(id, 10)} />
      </Box>
    </Container>
  );
};

export default RecipeDetails;
