// src/components/ViewDetailsButton.tsx
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

interface ViewDetailsButtonProps {
  recipeId: number;
  sx?: object; 
}

const ViewDetailsButton: React.FC<ViewDetailsButtonProps> = ({ recipeId, sx }) => {
  const history = useHistory();

  const handleViewDetails = () => {
    history.push(`/recipes/${recipeId}`);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={handleViewDetails}
      sx={sx} 
    >
      View Details
    </Button>
  );
};

export default ViewDetailsButton;
