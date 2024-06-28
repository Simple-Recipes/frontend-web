import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import commentService, { Comment } from '../../services/commentService';
import userService, { UserProfile } from '../../services/userService';

const CommentsList: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
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
      const comment: Comment = { recipeId, userId: userId!, content: newComment.trim() }; // 包含 userId
      const result = await commentService.postComment(comment);
      console.log('Post Comment Result:', result);
      setComments([...comments, result]);
      setNewComment('');
    } catch (err) {
      console.error('Post Comment Error:', err);
      setError('Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      // Find the comment that matches the commentId
      const commentToDelete = comments.find(comment => comment.id === commentId);

      // Check if the comment exists and the current user is the owner of the comment
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
    <div>
      <Typography variant="h4" component="h2">Comments</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {comments.map((comment) => (
            comment && (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemText primary={comment.content} />
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
      <div>
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
        <Button variant="contained" color="primary" onClick={handlePostComment}>
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentsList;
