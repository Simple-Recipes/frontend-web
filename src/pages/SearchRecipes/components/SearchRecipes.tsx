import React, { useState } from "react";
import recipeService, { Recipe } from "../../../services/recipeService";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const SearchRecipes: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await recipeService.searchRecipes(keyword);

      if (data.records) {
        setRecipes(data.records);
      } else {
        setError("Error fetching recipes");
      }
    } catch (error) {
      setError("Error fetching recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4">Search Recipes</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <TextField
          variant="outlined"
          fullWidth
          label="Enter keywords"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {recipes.map((recipe) => (
          <ListItem key={recipe.id} alignItems="flex-start">
            <ListItemText
              primary={<Typography variant="h6">{recipe.title}</Typography>}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    <strong>Ingredients:</strong>{" "}
                    {recipe.ingredients.join(", ")}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    <strong>Directions:</strong> {recipe.directions.join(" ")}
                  </Typography>
                  {recipe.link && (
                    <>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        <strong>Link:</strong>{" "}
                        <a
                          href={recipe.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {recipe.link}
                        </a>
                      </Typography>
                    </>
                  )}
                  {recipe.source && (
                    <>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        <strong>Source:</strong> {recipe.source}
                      </Typography>
                    </>
                  )}
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    <strong>NER:</strong> {recipe.ner.join(", ")}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    <strong>Created At:</strong>{" "}
                    {new Date(recipe.createTime).toLocaleString()}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    <strong>Updated At:</strong>{" "}
                    {new Date(recipe.updateTime).toLocaleString()}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SearchRecipes;
