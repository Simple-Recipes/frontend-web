import React, { useState, useEffect } from 'react';
import { Button, Box, Alert } from '@mui/material';
import favoriteService from '../../services/favoriteService';

interface FavoriteButtonProps {
  recipeId: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ recipeId }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favorites = await favoriteService.getAllMyFavorites();
        const isFavorited = favorites.some(favorite => favorite.id === recipeId);
        setIsFavorite(isFavorited);
      } catch (err) {
        console.error("Error checking favorite status:", err);
        setError("Failed to load favorite status");
      }
    };

    checkIfFavorite();
  }, [recipeId]);

  const handleAddToFavorites = async () => {
    try {
      await favoriteService.addToFavorites(recipeId);
      setIsFavorite(true);
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError("Failed to add to favorites");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await favoriteService.removeFromFavorites(recipeId);
      setIsFavorite(false);
    } catch (err) {
      console.error("Error removing from favorites:", err);
      setError("Failed to remove from favorites");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToFavorites}
          disabled={isFavorite}
        >
          Add to Favorites
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveFromFavorites}
          disabled={!isFavorite}
          style={{ marginLeft: '10px' }}
        >
          Remove from Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default FavoriteButton;
