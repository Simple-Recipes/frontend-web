import React, { useState } from 'react';
import userService, { UserProfile } from '../../../services/userService';
import { Card, CardContent, Typography, TextField, Button, Avatar, Alert, Box, Grid } from '@mui/material';

interface UserProfileProps {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ profile, setProfile }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (profile) {
      try {
        const updatedProfile = await userService.updateUserProfile(profile);
        setProfile(updatedProfile);
        setEditMode(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        setError('Error updating profile');
      }
    }
  };

  return (
    <Card>
      <CardContent>
        {error && <Alert severity="error">{error}</Alert>}
        {profile && (
          <>
            <Typography variant="h5" component="div" align="center" gutterBottom>
              User Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                {profile.avatar ? (
                  <Avatar src={profile.avatar} alt="User Avatar" sx={{ width: 150, height: 150, margin: 'auto' }} />
                ) : (
                  <Typography variant="body2" align="center">No Avatar</Typography>
                )}
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">Username: </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    />
                  ) : (
                    <Typography variant="body2">{profile.username}</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">Password: </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      type="password"
                      value={profile.password}
                      onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    />
                  ) : (
                    <Typography variant="body2">********</Typography>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">Email: </Typography>
                  {editMode ? (
                    <TextField
                      fullWidth
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  ) : (
                    <Typography variant="body2">{profile.email}</Typography>
                  )}
                </Box>
                {profile.createTime && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">Account Created: </Typography>
                    <Typography variant="body2">{profile.createTime}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleSave} >
                  Save
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfileComponent;
