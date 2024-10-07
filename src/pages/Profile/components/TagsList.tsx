import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import tagService, { Tag } from '../../../services/tagService';

const TagsList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const result = await tagService.getAllTags();
      setTags(result);
    } catch (err) {
      console.error('Fetch Tags Error:', err);
      setError('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) {
      setError('Tag name cannot be empty');
      return;
    }
    try {
      const tag = { name: newTag.trim() };
      const result = await tagService.addTag(tag);
      setTags([...tags, result]);
      setNewTag('');
    } catch (err) {
      console.error('Add Tag Error:', err);
      setError('Failed to add tag');
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      await tagService.deleteTag(id);
      setTags(tags.filter(tag => tag.id !== id));
    } catch (err) {
      console.error('Delete Tag Error:', err);
      setError('Failed to delete tag');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" component="h2">Tags</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {tags.map((tag) => (
            tag && (
              <ListItem key={tag.id} alignItems="flex-start">
                <ListItemText primary={tag.name} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTag(tag.id)} data-testid={`delete-button-${tag.id}`}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          ))}
        </List>
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Box mt={2}>
        <TextField
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag name..."
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddTag}>
          Add Tag
        </Button>
      </Box>
    </Box>
  );
};

export default TagsList;
