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
  Grid,
  Rating
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import commentService, { Comment } from '../../services/commentService';
import userService, { UserProfile } from '../../services/userService';

const CommentsList: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      fetchComments();
    }
  }, [recipeId, userId]);

  const fetchUserProfile = async () => {
    try {
      const userProfile: UserProfile = await userService.getUserProfile();
      setUserId(userProfile.id);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to load user profile');
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const result = await commentService.getRecipeComments(recipeId);
      console.log('Fetch Comments Result:', result);
      setComments(result);
    } catch (err) {
      console.error('Fetch Comments Error:', err);
      setError('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) {
      setError('Comment content cannot be empty');
      return;
    }
    try {
      const comment: Comment = { recipeId, userId: userId!, content: newComment.trim(), rating: newRating ?? 0 };
      const result = await commentService.postComment(comment);
      console.log('Post Comment Result:', result);
      setComments([...comments, result]);
      setNewComment('');
      setNewRating(0);
    } catch (err) {
      console.error('Post Comment Error:', err);
      setError('Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const commentToDelete = comments.find(comment => comment.id === commentId);

      if (commentToDelete && commentToDelete.userId === userId) {
        await commentService.deleteComment(commentId);
        console.log('Delete Comment Result:', commentId);
        setComments(comments.filter(comment => comment.id !== commentId));
      } else {
        setError('You can only delete your own comments');
        console.error('Delete Comment Error: Unauthorized attempt to delete comment');
      }
    } catch (err) {
      console.error('Delete Comment Error:', err);
      setError('Failed to delete comment');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Comments
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {comments.map((comment) => (
            comment && (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box>
                      <Typography variant="body1" gutterBottom>
                        {comment.content}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
                        User ID: {comment.userId}
                      </Typography>
                      <Rating name="read-only" value={comment.rating} readOnly />
                    </Box>
                  }
                />
                {comment.userId === userId && (
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteComment(comment.id!)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </ListItem>
            )
          ))}
        </List>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <Box mt={3}>
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Box display="flex" alignItems="center" mt={2}>
          <Typography component="legend" style={{ marginRight: '8px' }}>Rating</Typography>
          <Rating
            name="simple-controlled"
            value={newRating}
            onChange={(event, newValue) => {
              setNewRating(newValue);
            }}
          />
        </Box>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handlePostComment}>
            Post Comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentsList;
