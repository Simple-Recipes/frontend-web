import React, { useEffect, useState } from 'react';
import likeService from '../../services/likeService';
import userService from '../../services/userService';
import { Button, Typography, Box, Alert } from '@mui/material';

interface LikeProps {
  recipeId: number;
}

const Like: React.FC<LikeProps> = ({ recipeId }) => {
  const [likes, setLikes] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likeCount = await likeService.getRecipeLikes(recipeId);
        setLikes(likeCount);
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError("Failed to fetch likes");
      }
    };

    const fetchUserProfile = async () => {
      try {
        const userProfile = await userService.getUserProfile();
        setUserId(userProfile.id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile");
      }
    };

    fetchLikes();
    fetchUserProfile();
  }, [recipeId]);

  const handleLike = async () => {
    if (!userId) {
      setError("You must be logged in to like a recipe");
      return;
    }

    try {
      await likeService.likeRecipe({ userId, recipeId });
      setLikes(likes + 1);
    } catch (err) {
      console.error("Error liking recipe:", err);
      setError("Failed to like the recipe");
    }
  };

  const handleUnlike = async () => {
    if (!userId) {
      setError("You must be logged in to unlike a recipe");
      return;
    }

    try {
      await likeService.unlikeRecipe({ userId, recipeId });
      setLikes(likes - 1);
    } catch (err) {
      console.error("Error unliking recipe:", err);
      setError("Failed to unlike the recipe");
    }
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleLike}>
          Like
        </Button>
        <Button variant="contained" color="secondary" onClick={handleUnlike} style={{ marginLeft: '10px' }}>
          Unlike
        </Button>
      </Box>
      <Typography variant="h6">{likes} Likes</Typography>
    </Box>
  );
};

export default Like;
