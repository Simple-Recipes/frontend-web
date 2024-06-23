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

const CommentsList: React.FC<{ recipeId: number }> = ({ recipeId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 假设用户ID存储在localStorage中
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

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
      const comment: Comment = { recipeId, userId, content: newComment.trim() }; // 包含 userId
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
      await commentService.deleteComment(commentId, userId);
      console.log('Delete Comment Result:', commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
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
