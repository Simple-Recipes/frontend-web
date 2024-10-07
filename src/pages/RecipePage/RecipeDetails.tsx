import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import recipeService, { Recipe } from "../../services/recipeService";
import Like from "./Like";
import FavoriteButton from "./FavoriteButton";
import { Container, Box, Typography, CircularProgress, Alert, Card, CardContent } from '@mui/material';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  const isImage = (url: string) => {
    return (/\.(jpeg|jpg|gif|png)$/i).test(url);
  }

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
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      {recipe && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom align="center">
              {recipe.title}
            </Typography>

            {recipe.link && isImage(recipe.link) ? (
              <div>
                <img src={recipe.link} alt={recipe.title} style={{ width: '700px', height: '500px', margin: '0 auto', display: 'block' }} />
              </div>
            ) : (
              <div>
                <img src={require("./../../assets/Image/1.png")} alt="Fallback Image" style={{ width: '100%', height: 'auto' }} />
              </div>
            )}

            <Typography variant="h5" component="div" gutterBottom>
              Ingredients:
            </Typography>
            <Box component="ul" sx={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              {recipe.ingredients.map((ingredient, index) => (
                <Box key={index} component="li" sx={{ marginBottom: '8px' }}>
                  {ingredient}
                </Box>
              ))}
            </Box>

            <Typography variant="h5" component="div" gutterBottom>
              Directions:
            </Typography>
            {recipe.directions.map((step, index) => (
              <Typography key={index} variant="body2" component="p" gutterBottom>
                <strong>Step {index + 1}:</strong> {step}
              </Typography>
            ))}

            <Typography variant="body1" component="p" gutterBottom>
              <strong>Minutes:</strong> {recipe.minutes}
            </Typography>

            {recipe.nutrition && (
              <Box>
                <Typography variant="body1" component="p" gutterBottom>
                  <strong>Nutrition:</strong>
                </Typography>
                {/* 所有 Nutrition 信息放在一行 */}
                <Box display="flex" flexWrap="wrap" gap={2}>
                  <Typography variant="body2"><strong>Calories:</strong> {recipe.nutrition[0]}</Typography>
                  <Typography variant="body2"><strong>Total Fat :</strong> {recipe.nutrition[1]}</Typography>
                  <Typography variant="body2"><strong>Sugar :</strong> {recipe.nutrition[2]}</Typography>
                  <Typography variant="body2"><strong>Sodium :</strong> {recipe.nutrition[3]}</Typography>
                  <Typography variant="body2"><strong>Protein :</strong> {recipe.nutrition[4]}</Typography>
                  <Typography variant="body2"><strong>Saturated Fat :</strong> {recipe.nutrition[5]}</Typography>
                  <Typography variant="body2"><strong>Carbohydrates :</strong> {recipe.nutrition[6]}</Typography>
                </Box>
              </Box>
            )}

            {/* Created At 和 Updated At 同行 */}
            <Box display="flex" justifyContent="space-between" maxWidth="600px" mt={2}>
              <Typography variant="body1" component="p" gutterBottom>
                <strong>Created At:</strong> {new Date(recipe.createTime).toLocaleString()}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                <strong>Updated At:</strong> {new Date(recipe.updateTime).toLocaleString()}
              </Typography>
            </Box>

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
