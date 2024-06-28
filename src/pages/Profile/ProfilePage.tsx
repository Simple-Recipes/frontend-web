import React, { useState, useEffect } from "react";
import userService, { UserProfile } from "../../services/userService";
import recipeService, { Recipe } from "../../services/recipeService";
import { Container, Card, CircularProgress, Alert } from "@mui/material";
import UserProfileComponent from "./components/UserProfileComponent";
import UserRecipes from "./components/UserRecipes";
import UserFavorites from "./components/UserFavorites";
import UserLikes from "./components/UserLikes";
import TagsList from "./components/TagsList";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const fetchProfileAndRecipes = async () => {
      try {
        const profileData = await userService.getUserProfile();
        setProfile(profileData);

        const recipesData = await recipeService.getUserRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching profile or recipes:", error);
        setError("Error fetching profile or recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndRecipes();
  }, []);

  if (loading) return <CircularProgress />;

  if (!isLoggedIn) {
    return (
      <Alert severity="warning">
        Users need to be logged in to view profiles.
      </Alert>
    );
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }} className="container">
     
        {error && <Alert severity="error">{error}</Alert>}
        {profile && (
          <UserProfileComponent profile={profile} setProfile={setProfile} />
        )}
      
      <Card sx={{ p: 4, mt: 2 }}>
        <UserRecipes recipes={recipes} setRecipes={setRecipes} />
      </Card>
      
        <UserFavorites />
        <UserLikes/>
        <TagsList/>
      
    </Container>
  );
};

export default ProfilePage;
